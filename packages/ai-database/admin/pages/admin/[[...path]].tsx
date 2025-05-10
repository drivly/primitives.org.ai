import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Payload } from 'payload'
import { getPayload } from 'payload/dist/payload'

const AdminPage: NextPage = () => {
  const router = useRouter()
  
  React.useEffect(() => {
    const initAdmin = async () => {
      const payload = await getPayload({})
      
      if (typeof window !== 'undefined') {
        window.location.href = '/admin'
      }
    }
    
    initAdmin()
  }, [router])
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Loading Payload CMS Admin...</h1>
    </div>
  )
}

export default AdminPage
