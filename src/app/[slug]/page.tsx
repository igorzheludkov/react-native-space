import { api } from '@/constants/global'
import { Category, Post } from '@/models/content'
import fetchData from '@/utils/fetchData'

type CategoryCard = {
  categoryTitle: string
  data: Post[]
}

export async function generateMetadata() {
  return {
    title: `Top Libs`,
    description: 'Most used libraries for React Native'
  }
}

export default async function Page({ params }: { params: any }) {
  const allCategories = await fetchData(api.categories)
  const parentCategory = allCategories.find((category: Category) => category.slug === params.slug)
  const parentSubcategories = allCategories.filter(
    (category: Category) => category.parent === parentCategory.id
  )
  const allPosts = await fetchData(api.posts)
  const content = parentSubcategories.map((category: Category) => {
    const data = allPosts.filter((post: Post) => post.categories.includes(category.id))
    return {
      categoryTitle: category.name,
      data
    }
  })

  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      {content.map((category: CategoryCard) => {
        if (category.data.length) {
          return (
            <div key={category.categoryTitle}>
              <h2>{category.categoryTitle}</h2>
              <div>
                {category.data.map((post: Post) => (
                  <div key={post.id}>
                    <h3>{post.title.rendered}</h3>
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          )
        }
      })}
    </main>
  )
}
