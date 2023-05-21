import { YoastSeo } from '@/models/contentTypes'

export default function generateMetaHelper(meta: YoastSeo) {
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.og_image
        ? [
            {
              url: meta.og_image[0].url,
              width: meta.og_image[0].width,
              height: meta.og_image[0].height
            }
          ]
        : undefined,
      locale: 'ua_uk'
      // url: meta.url,
    }
  }
}
