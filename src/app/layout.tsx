import './globals.css'
import Navbar from '@/components/Navbar'
import { api, constants } from '@/constants/global'
import { Providers } from '@/redux/provider'
import fetchData from '@/utils/fetchData'
import { Category } from '@/models/contentTypes'
import Script from 'next/script'

export const metadata = {
  title: 'React Native Space',
  description: 'Корисна інформація для розробників на React Native'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await fetchData(api.categories)

  const navMenus = categories.filter((category: Category) => category.parent === constants.navCategory)

  return (
    <html lang='uk'>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=GTM-TJNDW2C'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', 'GTM-TJNDW2C');
        `}
      </Script>

      <body style={{ marginTop: '85px' }}>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-TJNDW2C'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
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
