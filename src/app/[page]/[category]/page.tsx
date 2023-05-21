import React from 'react'
import { api } from '@/constants/global'
import { Category, Page } from '@/models/contentTypes'
import fetchData from '@/utils/fetchData'
import generateMetaHelper from '@/utils/generateMetaHelper'
import styles from './page.module.css'
import CategoryPageComponent from '@/components/CategoryPageComponent'
import Link from 'next/link'

type RouteParams = {
  category: string
}

async function getCurrentCategory(params: RouteParams) {
  const allPages = await fetchData(api.pages)
  const allCategories = await fetchData(api.categories)
  const currentCategory: Category = allCategories.find(
    (category: Category) => category.slug === params.category
  )
  const categoryPosts = await fetchData(currentCategory._links['wp:post_type'][0].href)
  const categoryPage: Page | undefined = allPages.find(
    (page: Page) => page.categories[0] === currentCategory.id
  )

  return { categoryPage, categoryPosts }
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const { categoryPage } = await getCurrentCategory(params)

  if (categoryPage) {
    return generateMetaHelper(categoryPage.yoast_head_json)
  } else return {}
}

export default async function Category({ params }: { params: RouteParams }) {
  const { categoryPage, categoryPosts } = await getCurrentCategory(params)

  if (categoryPage) {
    return (
      <>
        <CategoryPageComponent categoryPage={categoryPage} categoryPosts={categoryPosts} />
      </>
    )
  }
}
