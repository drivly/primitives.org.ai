import { compileMdx } from 'nextra/compile'
import { MDXRemote } from 'nextra/mdx-remote'
import { generateStaticParamsFor } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '@/mdx-components'
import fs from 'fs'

// export const generateStaticParams = generateStaticParamsFor('pkg')

export async function generateStaticParams() {
  // find all README.md files in the packages directory
  const packages = fs.readdirSync('packages').filter((file) => file.endsWith('README.md'))
 
  return packages.map((pkg) => ({ pkg }))
}
const Wrapper = getMDXComponents().wrapper

// export 

export default async function PackagePage({ params }: { params: Promise<{ pkg: string }> }) {
  const { pkg } = await params
  const readmeContent = fs.readFileSync(`packages/${pkg}/README.md`, 'utf8')
  const rawJs = await compileMdx(`
  ${readmeContent}
  `)
  return (
    <Wrapper toc={[]} metadata={{ title: pkg, filePath: `packages/${pkg}/README.md` }}>
      <MDXRemote compiledSource={rawJs} components={{}} />
    </Wrapper>
  )
}
