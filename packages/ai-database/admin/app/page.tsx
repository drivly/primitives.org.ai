import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl font-bold mb-6'>AI Database Admin</h1>
      <p className='mb-4'>Welcome to the AI Database Admin Portal</p>
      <Link href='/admin' className='text-blue-500 hover:underline'>
        Go to Admin Dashboard
      </Link>
    </main>
  )
}
