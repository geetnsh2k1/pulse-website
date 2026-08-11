// Same card as Open Graph — X reads its own tag, so the file has to exist.
export { alt, size, contentType } from "@/components/og-card";
import { ogCard } from "@/components/og-card";

export default function Image() {
  return ogCard();
}
