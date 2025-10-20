export function payloadURL() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.PAYLOAD_URL;
  if (!url) return undefined;
  return url.replace(/\/$/, "");
}
export function mediaURL(path?: string | null) {
  if (!path) return undefined;
  const base = payloadURL();
  if (!base) return path || undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : "/" + path}`;
}
