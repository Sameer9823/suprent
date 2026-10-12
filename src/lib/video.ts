export type VideoSource =
  | { kind: "file"; src: string }
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string };

const YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/;
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/;

/**
 * Accepts a direct file (/videos/tour.mp4, https://cdn.example.com/tour.webm),
 * a YouTube link or a Vimeo link and returns how to play it. Returns null when empty.
 */
export function parseVideoUrl(url: string | null | undefined): VideoSource | null {
  const value = url?.trim();
  if (!value) return null;
  const yt = value.match(YOUTUBE);
  if (yt) return { kind: "youtube", id: yt[1] };
  const vm = value.match(VIMEO);
  if (vm) return { kind: "vimeo", id: vm[1] };
  return { kind: "file", src: value };
}

export function embedUrl(source: Exclude<VideoSource, { kind: "file" }>): string {
  return source.kind === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : `https://player.vimeo.com/video/${source.id}?autoplay=1&title=0&byline=0&portrait=0`;
}
