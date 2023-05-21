import React from 'react'
import { api } from '@/constants/global'
import { Post } from '@/models/content'
import fetchData from '@/utils/fetchData'
import styles from './page.module.css'
import generateMetaHelper from '@/utils/generateMetaHelper'

type RouteParams = {
  subpage: string
}

async function getCurrentPost(param: string): Promise<Post> {
  const allPosts = await fetchData(api.posts)
  return allPosts.find((post: Post) => post.slug === param)
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const post = await getCurrentPost(params.subpage)
  return generateMetaHelper(post.yoast_head_json)
}

export default async function SubPage({ params }: { params: RouteParams }) {
  const post = await getCurrentPost(params.subpage)
  return (
    <div>
      <h1 className={styles.title}>{post.title.rendered}</h1>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
    </div>
  )
}
