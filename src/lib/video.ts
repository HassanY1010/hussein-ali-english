export function getEmbedUrl(
  url: string,
  provider?: string
): { type: "iframe" | "video"; embedUrl: string } {
  if (!url) return { type: "iframe", embedUrl: "" };

  const cleanUrl = url.trim();

  // Cloudflare Stream
  if (
    provider === "cloudflare" ||
    cleanUrl.includes("videodelivery.net") ||
    cleanUrl.includes("cloudflarestream.com")
  ) {
    // If it's already an iframe URL
    if (cleanUrl.includes("iframe.videodelivery.net")) {
      return {
        type: "iframe",
        embedUrl: cleanUrl,
      };
    }
    // Extract UID if given
    const cfMatch = cleanUrl.match(/(?:videodelivery\.net|cloudflarestream\.com)\/([a-zA-Z0-9]+)/);
    if (cfMatch && cfMatch[1]) {
      return {
        type: "iframe",
        embedUrl: `https://iframe.videodelivery.net/${cfMatch[1]}`,
      };
    }
    return {
      type: "iframe",
      embedUrl: cleanUrl,
    };
  }

  // YouTube detection
  const ytMatch = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );

  if (ytMatch && ytMatch[1]) {
    return {
      type: "iframe",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`,
    };
  }

  // Vimeo detection
  const vimeoMatch = cleanUrl.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:$|\/|\?)/
  );
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "iframe",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // Direct MP4 / WebM / MOV / Storage Uploads
  if (
    cleanUrl.endsWith(".mp4") ||
    cleanUrl.endsWith(".webm") ||
    cleanUrl.endsWith(".mov") ||
    cleanUrl.includes("/storage/v1/object/public/") ||
    provider === "direct" ||
    provider === "upload"
  ) {
    return {
      type: "video",
      embedUrl: cleanUrl,
    };
  }

  // Fallback as iframe
  return {
    type: "iframe",
    embedUrl: cleanUrl,
  };
}
