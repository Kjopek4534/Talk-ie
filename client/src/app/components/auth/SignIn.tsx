// client/src/app/components/auth/SignIn.tsx
'use client'

import { useState } from 'react'
import { signIn } from '../../services/auth'
import Link from 'next/link'
import Image from 'next/image'
import axios, { AxiosError } from 'axios'
import styles from './SignIn.module.css'

interface ErrorResponse {
  error: string
}

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    console.log('Sign In button clicked')
    try {
      const response = await signIn(username, password)
      console.log('Signed in successfully', response.data)
      setError(null)
    } catch (err) {
      console.error('Error signing in', err)
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<ErrorResponse>
        const errorMessage =
          axiosErr.response?.data?.error || 'An unexpected error occurred'
        setError(errorMessage)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Talk'ie Logo"
          width={100}
          height={100}
          className={styles.logo}
        />
      </Link>
      <h2 className={styles.title}>Talk'ie</h2>
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
