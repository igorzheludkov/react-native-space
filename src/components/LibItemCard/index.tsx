import React from 'react'
import { CategoryCard } from '@/app/[page]/page'
import Link from 'next/link'
import { YoastSeo } from '@/models/contentTypes'
import styles from './index.module.css'
import Image from 'next/image'

type Props = {
  category: CategoryCard
  parentCategory: string
}

export default function LibItemCard({ category, parentCategory }: Props) {
  const iconLink = (data: YoastSeo) => {
    if (data.og_image?.length > 0) {
      return data.og_image[0].url
    } else {
      return ''
    }
  }

  return (
    <div className={styles.itemCard} key={category.categoryTitle}>
      <h2>
        <Link href={`/${parentCategory}/${category.categorySlug}`}>{category.categoryTitle}</Link>
      </h2>
      <div>
        {category.data.map((post) => (
          <div className={styles.libContainer} key={post.id}>
            {post.yoast_head_json?.og_image && (
              <Image
                className={styles.libIcon}
                width={25}
                height={25}
                src={iconLink(post.yoast_head_json)}
                alt={post.title.rendered}
              />
            )}
            <Link className={styles.lib} href={`/${parentCategory}/${category.categorySlug}/${post.slug}`}>
              {post.title.rendered}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
