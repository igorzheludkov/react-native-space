export type Category = {
  id: number
  name: string
  slug: string
  parent: number
}

export type Post = {
  id: number
  title: { rendered: string }
  categories: number[]
  slug: string
  content: { rendered: string }
  excerpt: { rendered: string }
  acf: { rating: number }
}
