'use client'

import Link from 'next/link'
import { Category } from '@/models/contentTypes'
import { constants } from '@/constants/global'
import { usePathname } from 'next/navigation'
import styles from './index.module.css'

type PropsTypes = {
  items: Category[]
}

export default function Navbar({ items }: PropsTypes) {
  const path = usePathname()

  const active = (basicClass: string, slug: string) => {
    const activeItem = items.find((item) => item.slug === path.split('/')[1])
    return `${basicClass} ${activeItem?.slug === slug ? styles.active : ''}`
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <a className={styles.btn}>{constants.siteName}</a>
      </div>
      <div className={styles.menu}>
        <ul className={styles.menu__items}>
          {items.map((item) => (
            <li key={item.id}>
              <Link className={active(styles.menu__link, item.slug)} href={`/${item.slug}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
