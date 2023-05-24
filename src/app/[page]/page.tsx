import { api } from '@/constants/global'
import { Category, Post } from '@/models/contentTypes'
import fetchData from '@/utils/fetchData'
import styles from './page.module.css'
import LibItemCard from '@/components/LibItemCard'
import generateMetaHelper from '@/utils/generateMetaHelper'

type RouteParams = {
  page: string
}

export type CategoryCard = {
  categoryTitle: string
  categorySlug: string
  data: Post[]
}

async function getPageData(page: string, metadata: boolean) {
  const allCategories = await fetchData(api.categories)
  const allPosts = await fetchData(api.posts)

  const currentCategory: Category = allCategories.find((category: Category) => category.slug === page)
  const parentSubcategories = allCategories.filter(
    (category: Category) => category.parent === currentCategory.id
  )

  if (metadata) {
    return currentCategory
  } else {
    return parentSubcategories.map((category: Category) => {
      const data = allPosts
        .filter((post: Post) => post.categories.includes(category.id))
        .sort((a: Post, b: Post) => {
          const ratingA = a.acf.rating
          const ratingB = b.acf.rating
          return ratingA - ratingB
        })
      return {
        categoryTitle: category.name,
        categorySlug: category.slug,
        data
      }
    })
  }
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const category = await getPageData(params.page, true)
  return generateMetaHelper(category.yoast_head_json)
}

export default async function Page({ params }: { params: RouteParams }) {
  const content = await getPageData(params.page, false)
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
