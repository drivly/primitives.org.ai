import type { MDXComponents } from 'mdx/types'
import { Hero } from './components/Hero'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Hero,
  }
}