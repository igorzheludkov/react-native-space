import React from 'react'
import styles from './index.module.css'
import { CategoryCard } from '@/app/[page]/page'
import Link from 'next/link'

type Props = {
  category: CategoryCard
  parentCategory: string
}

export default function LibItemCard({ category, parentCategory }: Props) {
  return (
    <div className={styles.itemCard} key={category.categoryTitle}>
      <h2>{category.categoryTitle}</h2>
      <div>
        {category.data.map((post) => (
          <div key={post.id}>
            <Link href={`/${parentCategory}/${category.categorySlug}/${post.slug}`}>
              <p>{post.title.rendered}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
