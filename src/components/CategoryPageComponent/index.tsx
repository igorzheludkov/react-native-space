'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Post, Page } from '@/models/contentTypes'
import styles from './index.module.css'
import Link from 'next/link'

type Props = {
  categoryPage: Page
  categoryPosts: Post[]
}

export default function CategoryPageComponent({ categoryPage, categoryPosts }: Props) {
  const pathname = usePathname()
  return (
    <div>
      <h1 className={styles.title}>{categoryPage.title.rendered}</h1>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: categoryPage.content.rendered }}
      ></div>
      {categoryPosts.map((post: Page) => (
        <section key={post.id} className={styles.post}>
          <h2 className={styles.subTitle}>{post.title.rendered}</h2>
          <div
            className={styles.subContent}
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          ></div>
          <Link href={`${pathname}/${post.slug}`}>Читати детальніше</Link>
        </section>
      ))}
    </div>
  )
}
