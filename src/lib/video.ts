export function getEmbedUrl(url: string, provider: string): { type: "iframe" | "video"; embedUrl: string } {
  if (!url) return { type: "iframe", embedUrl: "" };

  const cleanUrl = url.trim();

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
  const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "iframe",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // Direct MP4 / WebM
  if (cleanUrl.endsWith(".mp4") || cleanUrl.endsWith(".webm") || provider === "direct") {
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
