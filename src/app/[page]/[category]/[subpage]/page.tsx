import React from 'react'
import { api } from '@/constants/global'
import { Post } from '@/models/content'
import fetchData from '@/utils/fetchData'
import styles from './page.module.css'

type RouteParams = {
  subpage: string
}

export default async function SubPage({ params }: { params: RouteParams }) {
  const allPosts = await fetchData(api.posts)
  const currentPost = allPosts.find((post: Post) => post.slug === params.subpage)

  return (
    <div>
      <h1 className={styles.title}>{currentPost.title.rendered}</h1>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: currentPost.content.rendered }}
      ></div>
    </div>
  )
}
