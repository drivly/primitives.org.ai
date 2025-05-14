import { compileMdx } from 'nextra/compile'
import { MDXRemote } from 'nextra/mdx-remote'
import { generateStaticParamsFor } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '@/mdx-components'
import fs from 'fs'
import path from 'path'

// export const generateStaticParams = generateStaticParamsFor('pkg')

export async function generateStaticParams() {
  const packageDirs = fs.readdirSync(path.join(process.cwd(), 'packages'))
    .filter(dir => {
      try {
        return fs.statSync(path.join(process.cwd(), 'packages', dir)).isDirectory() &&
               fs.existsSync(path.join(process.cwd(), 'packages', dir, 'README.md'))
      } catch {
        return false
      }
    })
 
  return packageDirs.map((pkg) => ({ pkg }))
}
const Wrapper = getMDXComponents().wrapper

// export 

export default async function PackagePage({ params }: { params: Promise<{ pkg: string }> }) {
  const { pkg } = await params
  try {
    const readmeContent = fs.readFileSync(path.join(process.cwd(), `packages/${pkg}/README.md`), 'utf8')
    const rawJs = await compileMdx(`
    ${readmeContent}
    `)
    return (
      <Wrapper toc={[]} metadata={{ title: pkg, filePath: `packages/${pkg}/README.md` }}>
        <MDXRemote compiledSource={rawJs} components={{}} />
      </Wrapper>
    )
  } catch (error) {
    console.error(`Error reading README for ${pkg}:`, error)
    return (
      <div className='p-4'>
        <h1 className='text-2xl font-bold'>Documentation not found</h1>
        <p className='mt-4'>The documentation for {pkg} could not be loaded.</p>
      </div>
    )
  }
}
