import LuxuryBlog from '@/components/luxury/LuxuryBlog';
import { generateMetadata } from "@/lib/seo-config"

export const metadata = generateMetadata({
  title: "Blog Fotografi - Tips, Tren & Inspirasi",
  description: "Temukan tips fotografi, tren wedding, teknik portrait, dan cerita di balik layar dari Madiun Photography.",
  url: "/blog",
})

export default function BlogPage() {
  return <LuxuryBlog />;
}
