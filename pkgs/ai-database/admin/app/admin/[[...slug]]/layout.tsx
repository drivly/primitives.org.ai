import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | AI Database',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
