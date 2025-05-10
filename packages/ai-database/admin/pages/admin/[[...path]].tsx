import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const AdminPage: NextPage = () => {
  const router = useRouter()
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin'
    }
  }, [router])
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Loading Payload CMS Admin...</h1>
    </div>
  )
}

export default AdminPage
