import React from 'react'

interface AuthProps {
  redirectUrl?: string
  onSuccess?: (user: any) => void
  onError?: (error: Error) => void
}

export function Auth({ redirectUrl = '/onboarding', onSuccess, onError }: AuthProps) {
  
  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <p>Sign in to continue to the waitlist</p>
      
      <div className="auth-providers">
        <button className="auth-button github" onClick={() => handleAuth('github')}>
          Sign in with GitHub
        </button>
        <button className="auth-button google" onClick={() => handleAuth('google')}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
  
  function handleAuth(provider: string) {
    console.log(`Authenticating with ${provider}`)
    
    setTimeout(() => {
      const user = { id: '123', name: 'Test User', email: 'test@example.com' }
      if (onSuccess) {
        onSuccess(user)
      } else {
        window.location.href = redirectUrl
      }
    }, 1000)
  }
}

export function setupAuth(app: any) {
  
  
  return {
    getUser: async () => {
      return null
    },
    signIn: async (provider: string) => {
      console.log(`Signing in with ${provider}`)
    },
    signOut: async () => {
      console.log('Signing out')
    }
  }
}
