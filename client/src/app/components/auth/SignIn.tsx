'use client'

import { useState } from 'react'
import { signIn } from '../../services/auth'
import Link from 'next/link'
import styles from './SignIn.module.css'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    console.log('Sign In button clicked') // Debugging
    try {
      const response = await signIn(username, password)
      console.log('Signed in successfully', response.data)
      setError(null) // Clear any previous errors
    } catch (error) {
      console.error('Error signing in', error)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(error.response?.data?.error || 'An unexpected error occurred')
    }
  }

  return (
    <div className={styles.container}>
      <h2>Log In</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.input}
      />
      <button onClick={handleSignIn} className={styles.button}>
        Log In
      </button>
      <Link href="/auth/signup" className={styles.link}>
        Sign Up
      </Link>
    </div>
  )
}

export default SignIn
