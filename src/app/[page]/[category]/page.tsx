import React from 'react'
import { api } from '@/constants/global'
import { Category, Page } from '@/models/content'
import fetchData from '@/utils/fetchData'
import generateMetaHelper from '@/utils/generateMetaHelper'
import styles from './page.module.css'

type RouteParams = {
  category: string
}

async function getCurrentPage(params: RouteParams) {
  const allPages = await fetchData(api.pages)
  const allCategories = await fetchData(api.categories)
  const currentCategory: Category = allCategories.find(
    (category: Category) => category.slug === params.category
  )

  const currentPage: Page | undefined = allPages.find(
    (page: Page) => page.categories[0] === currentCategory.id
  )

  return currentPage
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const page = await getCurrentPage(params)

  if (page) {
    return generateMetaHelper(page.yoast_head_json)
  } else return {}
}

export default async function Category({ params }: { params: RouteParams }) {
  const page = await getCurrentPage(params)

  if (page) {
    return (
      <div>
        <h1 className={styles.title}>{page.title.rendered}</h1>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
      </div>
    )
  }
}
