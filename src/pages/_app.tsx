import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import Layout from '@/components/Layout'
import SEO from '@/next-seo.config'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
