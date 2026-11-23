const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

async function cleanupDemoData() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is missing.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("1. Connecting to PostgreSQL database...");
    const client = await pool.connect();

    // Step A: Backup existing courses and lessons to a local backup file before removal
    console.log("2. Creating safe backup of demo data...");
    const existingCourses = await client.query("SELECT * FROM courses");
    const existingLessons = await client.query("SELECT * FROM lessons");

    const backupDir = path.join(__dirname, "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const backupFile = path.join(backupDir, `demo-data-backup-${Date.now()}.json`);
    fs.writeFileSync(
      backupFile,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          coursesCount: existingCourses.rows.length,
          lessonsCount: existingLessons.rows.length,
          courses: existingCourses.rows,
          lessons: existingLessons.rows,
        },
        null,
        2
      )
    );
    console.log(`✓ Backup saved to: ${backupFile}`);

    // Step B: Target removal of demo courses and lessons
    console.log("3. Removing demo courses and lessons...");
    // Foreign key CASCADE will remove lessons, but let's be explicit and safe:
    const delLessons = await client.query("DELETE FROM lessons WHERE course_id IN (SELECT id FROM courses)");
    console.log(`✓ Deleted ${delLessons.rowCount} demo lessons.`);

    const delCourses = await client.query("DELETE FROM courses");
    console.log(`✓ Deleted ${delCourses.rowCount} demo courses.`);

    // Step C: Verify zero courses and lessons remain
    const countCourses = await client.query("SELECT COUNT(*) FROM courses");
    const countLessons = await client.query("SELECT COUNT(*) FROM lessons");
    console.log(`4. Verification: Remaining courses = ${countCourses.rows[0].count}, Remaining lessons = ${countLessons.rows[0].count}`);

    // Step D: Verify categories, levels, and settings are preserved
    const countCats = await client.query("SELECT COUNT(*) FROM categories");
    const countLevels = await client.query("SELECT COUNT(*) FROM levels");
    const countSettings = await client.query("SELECT COUNT(*) FROM site_settings");
    console.log(`5. Structure Intact: Categories = ${countCats.rows[0].count}, Levels = ${countLevels.rows[0].count}, Settings = ${countSettings.rows[0].count}`);

    client.release();
    await pool.end();
    console.log("✓ Database cleanup completed successfully!");
  } catch (err) {
    console.error("Cleanup error:", err);
    process.exit(1);
  }
}

cleanupDemoData();
