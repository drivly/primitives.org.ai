import React from 'react'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '../../../payload.config'

export const metadata: Metadata = {
  title: 'Admin',
}

export default async function AdminPage({ params }: { params: { slug: string[] } }) {
  const { slug } = params

  const payload = await getPayload({
    config,
  })

  if (!payload) {
    return notFound()
  }

  const { AdminUI } = await payload.getAdminUI()

  return <AdminUI />
}
