'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    require('payload/dist/admin')
  }, [])

  return null
}
