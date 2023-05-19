import Link from 'next/link'
import styles from './index.module.css'
import { Category } from '@/models/content'
import { constants } from '@/constants/global'

type PropsTypes = {
  items: Category[]
}

export default function Navbar({ items }: PropsTypes) {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <a className={styles.btn}>{constants.siteName}</a>
      </div>
      <div className={styles.menu}>
        <ul className={styles.menu__items}>
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`/${item.slug}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
