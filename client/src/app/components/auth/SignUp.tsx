//comment to push my version of signup cuz I fucked up

'use client'

import { useState } from 'react'
import { signUp } from '@/app/services/auth'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import styles from '@/app/styles/SignUp.module.css'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async () => {
    console.log('Sign Up button clicked')
    try {
      const response = await signUp(username, email, password)
      console.log('Signed up successfully', response.data)
      setError(null)
      router.push('/auth/signin') // Redirect to sign in page
    } catch (err: unknown) {
      console.error('Error signing up', err)
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'An unexpected error occurred')
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
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.input}
      />
      <button onClick={handleSignUp} className={styles.button}>
        Sign Up
      </button>
      <Link href="/auth/signin" className={styles.link}>
        Log In
      </Link>
    </div>
  )
}

export default SignUp
