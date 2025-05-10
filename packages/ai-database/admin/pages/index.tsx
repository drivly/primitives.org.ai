import React from 'react'
import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>AI Database Admin</h1>
      <p>This is the admin interface for the AI Database package.</p>
      <p>
        <Link href="/admin">Go to Payload CMS Admin</Link>
      </p>
    </div>
  )
}

export default Home
