/* eslint-env node */
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const { viewport } = Head

export const metadata = {
  metadataBase: new URL('https://primitives.org.ai'),
  title: {
    template: '%s - AI Primitives',
  },
  description: 'AI Primitives: Build AI-native applications with type-safe primitives',
  applicationName: 'AI Primitives',
  generator: 'Next.js',
  appleWebApp: {
    title: 'AI Primitives',
  },
  other: {
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-TileColor': '#fff',
  },
  twitter: {
    site: 'https://primitives.org.ai',
  },
}

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={
        <div>
          AI <b>Primitives</b>
        </div>
      }
      // Next.js discord server
      chatLink='https://discord.gg/BHZCzx83'
    />
  )
  return (
    <html lang='en' dir='ltr' suppressHydrationWarning>
      <Head faviconGlyph='✦' />
      <body>
        <Layout
          navbar={navbar}
          footer={<Footer />}
          editLink='Edit this page on GitHub'
          docsRepositoryBase='https://github.com/shuding/nextra/blob/main/examples/docs'
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={await getPageMap()}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
