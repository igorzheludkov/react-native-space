// import './globals.css'
import Navbar from '@/components/Navbar'
import { api, constants } from '@/constants/global'
import { Providers } from '@/redux/provider'
import fetchData from '@/utils/fetchData'
import { Category } from '@/models/contentTypes'

export const metadata = {
  title: 'React Native Space',
  description: 'Корисна інформація для розробників на React Native'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await fetchData(api.categories)

  const navMenus = categories.filter((category: Category) => category.parent === constants.navCategory)

  return (
    <html lang='uk'>
      <body style={{marginTop: '85px'}}>
        <Providers>
          <>
            <Navbar items={navMenus} />
            {children}
          </>
        </Providers>
      </body>
    </html>
  )
}
