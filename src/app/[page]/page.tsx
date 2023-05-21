import { api } from '@/constants/global'
import { Category, Post } from '@/models/contentTypes'
import fetchData from '@/utils/fetchData'
import styles from './page.module.css'
import LibItemCard from '@/components/LibItemCard'

type RouteParams = {
  page: string
}

export type CategoryCard = {
  categoryTitle: string
  categorySlug: string
  data: Post[]
}

export async function generateMetadata() {
  return {
    title: `Top Libs`,
    description: 'Most used libraries for React Native'
  }
}

export default async function Page({ params }: { params: RouteParams }) {
  const allCategories = await fetchData(api.categories)
  const allPosts = await fetchData(api.posts)

  const parentCategory = allCategories.find((category: Category) => category.slug === params.page)
  const parentSubcategories = allCategories.filter(
    (category: Category) => category.parent === parentCategory.id
  )
  const content = parentSubcategories.map((category: Category) => {
    const data = allPosts.filter((post: Post) => post.categories.includes(category.id))
    return {
      categoryTitle: category.name,
      categorySlug: category.slug,
      data
    }
  })

  return (
    <main className={styles.wrapper}>
      {content.map((category: CategoryCard) => {
        if (category.data.length) {
          return <LibItemCard key={category.categoryTitle} category={category} parentCategory={params.page} />
        }
      })}
    </main>
  )
}
