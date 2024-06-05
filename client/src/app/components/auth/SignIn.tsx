//comment to push my version of signin cuz I fucked up

'use client'

import { useState } from 'react'
import { signIn } from '@/app/services/auth'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import styles from '@/app/styles/SignIn.module.css'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignIn = async () => {
    console.log('Sign In button clicked')
    try {
      const response = await signIn(username, password)
      console.log('Signed in successfully', response.data)
      localStorage.setItem('token', response.data.access_token) // Save JWT token
      setError(null)
      router.push('/chats') // Redirect to main chat page
    } catch (err: unknown) {
      console.error('Error signing in', err)
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('Invalid username or password')
        } else {
          setError(err.response?.data?.error || 'An unexpected error occurred')
        }
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
