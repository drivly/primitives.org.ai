import React from 'react'
import type { MDXRemoteProps } from 'next-mdx-remote'

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className='scroll-m-20 text-4xl font-bold tracking-tight' {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight' {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight' {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className='scroll-m-20 text-xl font-semibold tracking-tight' {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className='leading-7 [&:not(:first-child)]:mt-6' {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className='my-6 ml-6 list-disc [&>li]:mt-2' {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className='my-6 ml-6 list-decimal [&>li]:mt-2' {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className='mt-6 border-l-2 pl-6 italic' {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className='font-medium text-primary underline underline-offset-4' {...props} />,
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className='my-4 md:my-8' {...props} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className='my-6 w-full overflow-y-auto'>
      <table className='w-full' {...props} />
    </div>
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr className='m-0 border-t p-0 even:bg-muted' {...props} />,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right' {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right' {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className='mb-4 mt-6 overflow-x-auto rounded-lg bg-black p-4' {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm' {...props} />,
  div: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
  span: (props: React.HTMLAttributes<HTMLSpanElement>) => <span {...props} />,
}

export const mdxComponents: MDXRemoteProps['components'] = components
