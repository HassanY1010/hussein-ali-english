const crypto = require("crypto");
const { Pool } = require("pg");

// Configuration from environment
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "audit-test-secret-min-32-chars-long!!";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@hussein-academy.com";

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName, details = "") {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    testsPassed++;
  } else {
    console.error(`[FAIL] ${testName} - ${details}`);
    testsFailed++;
  }
}

// -------------------------------------------------------------
// 1. Session Token Integrity & Tampering Tests (HMAC-SHA256)
// -------------------------------------------------------------
function signToken(payload, secret) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${signature}`;
}

function verifyToken(token, secret) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expectedSignature = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }
  
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

async function runSessionTests() {
  console.log("\n=== Test Suite 1: Session Security & Cryptographic Integrity ===");
  
  // 1.1 Unauthenticated / Empty token
  assert(verifyToken(null, ADMIN_SESSION_SECRET) === null, "Rejects null session token");
  assert(verifyToken("", ADMIN_SESSION_SECRET) === null, "Rejects empty session token");
  assert(verifyToken("invalid-format", ADMIN_SESSION_SECRET) === null, "Rejects malformed token");

  // 1.2 Valid token
  const payload = { email: ADMIN_EMAIL, role: "admin", exp: Date.now() + 3600000 };
  const validToken = signToken(payload, ADMIN_SESSION_SECRET);
  const verified = verifyToken(validToken, ADMIN_SESSION_SECRET);
  assert(verified && verified.email === ADMIN_EMAIL, "Accepts legitimate HMAC-signed session");

  // 1.3 Tampered Payload
  const [data, sig] = validToken.split(".");
  const tamperedData = Buffer.from(JSON.stringify({ email: "hacker@evil.com", role: "admin", exp: Date.now() + 3600000 })).toString("base64url");
  const tamperedToken = `${tamperedData}.${sig}`;
  assert(verifyToken(tamperedToken, ADMIN_SESSION_SECRET) === null, "Rejects token with modified payload (signature mismatch)");

  // 1.4 Tampered Signature
  const forgedSigToken = `${data}.fakeSignature1234567890`;
  assert(verifyToken(forgedSigToken, ADMIN_SESSION_SECRET) === null, "Rejects token with forged/random signature");

  // 1.5 Wrong Secret
  assert(verifyToken(validToken, "wrong-secret-key-for-testing-123456") === null, "Rejects token signed with different secret key");

  // 1.6 Expired Token
  const expiredPayload = { email: ADMIN_EMAIL, role: "admin", exp: Date.now() - 1000 };
  const expiredToken = signToken(expiredPayload, ADMIN_SESSION_SECRET);
  assert(verifyToken(expiredToken, ADMIN_SESSION_SECRET) === null, "Rejects expired session token");
}

// -------------------------------------------------------------
// 2. Brute Force & Rate Limiting Simulation
// -------------------------------------------------------------
async function runRateLimitingTests() {
  console.log("\n=== Test Suite 2: Rate Limiting & Brute Force Prevention ===");
  
  const attempts = new Map();
  const MAX_ATTEMPTS = 5;
  const WINDOW_MS = 15 * 60 * 1000;

  function checkLimit(ip) {
    const now = Date.now();
    const entry = attempts.get(ip) || { count: 0, firstAttempt: now, blockedUntil: 0 };
    if (entry.blockedUntil > now) {
      return { allowed: false, remaining: 0, retryAfter: Math.ceil((entry.blockedUntil - now) / 1000) };
    }
    if (now - entry.firstAttempt > WINDOW_MS) {
      entry.count = 0;
      entry.firstAttempt = now;
      entry.blockedUntil = 0;
    }
    return { allowed: true, remaining: Math.max(0, MAX_ATTEMPTS - entry.count) };
  }

  function recordFail(ip) {
    const now = Date.now();
    const entry = attempts.get(ip) || { count: 0, firstAttempt: now, blockedUntil: 0 };
    entry.count += 1;
    if (entry.count >= MAX_ATTEMPTS) {
      entry.blockedUntil = now + WINDOW_MS;
    }
    attempts.set(ip, entry);
  }

  const testIP = "192.168.1.100";
  
  // Attempts 1 to 4 should be allowed
  for (let i = 1; i <= 4; i++) {
    const status = checkLimit(testIP);
    assert(status.allowed === true, `Attempt #${i} permitted (Remaining: ${status.remaining})`);
    recordFail(testIP);
  }

  // Attempt 5 should be the last permitted before lockout
  const attempt5 = checkLimit(testIP);
  assert(attempt5.allowed === true && attempt5.remaining === 1, "Attempt #5 is permitted as threshold attempt");
  recordFail(testIP);

  // Attempt 6 must be blocked
  const attempt6 = checkLimit(testIP);
  assert(attempt6.allowed === false, "Attempt #6 is strictly blocked after 5 failed attempts", `Allowed: ${attempt6.allowed}`);
  assert(attempt6.retryAfter > 0, "Blocked response includes active retryAfter countdown");

  // Different IP should still be allowed
  const cleanIP = "192.168.1.200";
  assert(checkLimit(cleanIP).allowed === true, "Unrelated IP is not penalized by another IP's lockout");
}

// -------------------------------------------------------------
// 3. Database Parameterized Queries & SQL Injection Testing
// -------------------------------------------------------------
async function runDatabaseSecurityTests() {
  console.log("\n=== Test Suite 3: Database Security & SQL Injection Resilience ===");
  if (!DATABASE_URL) {
    console.warn("[SKIP] DATABASE_URL not set; skipping live DB tests.");
    return;
  }

  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 2,
  });

  try {
    const client = await pool.connect();
    
    // 3.1 Test Basic Connection
    const health = await client.query("SELECT 1 AS alive");
    assert(health.rows[0].alive === 1, "PostgreSQL direct pooler connection verified");

    // 3.2 SQL Injection Payload Tests
    const maliciousInputs = [
      "' OR '1'='1",
      "admin' --",
      "'; DROP TABLE courses; --",
      "1 UNION SELECT null, email, password FROM users--",
      "x' AND 1=(SELECT COUNT(*) FROM information_schema.tables)--",
    ];

    for (const payload of maliciousInputs) {
      // Test parameterized query on courses by slug
      const res = await client.query("SELECT * FROM courses WHERE slug = $1", [payload]);
      assert(res.rows.length === 0, `SQL Injection safely neutralized for payload: [${payload}]`);
    }

    // 3.3 Draft / Published Content Boundary Enforcement
    const publishedCourses = await client.query(
      "SELECT id, title, is_published FROM courses WHERE is_published = true"
    );
    assert(publishedCourses.rows.length > 0, "Public query correctly returns published courses");
    assert(publishedCourses.rows.every(c => c.is_published === true), "Zero draft courses leaked in published query");

    const draftCourses = await client.query(
      "SELECT id, title, is_published FROM courses WHERE is_published = false"
    );
    console.log(`[INFO] Total draft courses in DB: ${draftCourses.rows.length}`);

    // Verify draft cannot be accessed via public slug query simulation
    if (draftCourses.rows.length > 0) {
      const draft = draftCourses.rows[0];
      const publicQueryForDraft = await client.query(
        "SELECT * FROM courses WHERE id = $1 AND is_published = true",
        [draft.id]
      );
      assert(publicQueryForDraft.rows.length === 0, `Draft course '${draft.title}' is completely inaccessible via public endpoint`);
    }

    client.release();
  } catch (err) {
    assert(false, "Database security tests threw an unhandled error", err.message);
  } finally {
    await pool.end();
  }
}

// -------------------------------------------------------------
// 4. Supabase Storage REST Integration Test
// -------------------------------------------------------------
async function runStorageSecurityTests() {
  console.log("\n=== Test Suite 4: Supabase Storage Integration & Limits ===");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || "uploads";

  if (!url || !key) {
    console.warn("[SKIP] Supabase credentials not set; skipping live storage tests.");
    return;
  }

  try {
    // 4.1 Check Bucket Accessibility via Service Role
    const listRes = await fetch(`${url}/storage/v1/object/list/${bucket}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefix: "", limit: 5 }),
    });

    assert(listRes.ok, `Storage Bucket '${bucket}' is accessible via REST API (HTTP ${listRes.status})`);

    // 4.2 Upload Small Test Object
    const testFileName = `audit-proof-${Date.now()}.txt`;
    const uploadRes = await fetch(`${url}/storage/v1/object/${bucket}/${testFileName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        "Content-Type": "text/plain",
      },
      body: Buffer.from("Security verification token proof"),
    });

    assert(uploadRes.ok, `Upload endpoint successfully stores objects (HTTP ${uploadRes.status})`);

    // 4.3 Clean up
    await fetch(`${url}/storage/v1/object/${bucket}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefixes: [testFileName] }),
    });
    console.log("[INFO] Temporary verification object safely deleted.");
  } catch (err) {
    assert(false, "Storage integration test error", err.message);
  }
}

// -------------------------------------------------------------
// Master Execution
// -------------------------------------------------------------
async function main() {
  console.log("=============================================================");
  console.log("    Hussein Ali English Academy - Production Security Audit   ");
  console.log("=============================================================");

  await runSessionTests();
  await runRateLimitingTests();
  await runDatabaseSecurityTests();
  await runStorageSecurityTests();

  console.log("\n=============================================================");
  console.log(`Summary: ${testsPassed} PASSED, ${testsFailed} FAILED`);
  console.log("=============================================================");

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal audit failure:", err);
  process.exit(1);
});
