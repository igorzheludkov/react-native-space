// only for category taxonomy
export type Category = {
  id: number
  name: string
  slug: string
  parent: number
  _links: {
    'wp:post_type': { href: string }[]
  }
}

export type Post = {
  id: number
  title: { rendered: string }
  categories: number[]
  slug: string
  content: { rendered: string }
  excerpt: { rendered: string }
  acf: { rating: number; icon: string }
  yoast_head_json: YoastSeo
}

export type Page = {
  id: number
  title: { rendered: string }
  categories: number[]
  slug: string
  content: { rendered: string }
  excerpt: { rendered: string }
  acf: { rating: number }
  yoast_head_json: YoastSeo
}

export type YoastSeo = {
  title: string
  description: string
  og_locale: string
  og_title: string
  og_description: string
  og_image: [
    {
      width: number
      height: number
      url: string
      type: string
    }
  ]
}
