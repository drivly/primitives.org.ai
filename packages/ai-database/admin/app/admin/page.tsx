import React from 'react'

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">AI Database Admin Portal</h1>
      <p className="mb-4">
        This is a placeholder for the Payload CMS admin portal.
      </p>
      <p className="mb-4">
        In a production environment, this would be integrated with Payload CMS.
      </p>
      <a href="/" className="text-blue-500 hover:underline">
        Back to Home
      </a>
    </div>
  )
}
