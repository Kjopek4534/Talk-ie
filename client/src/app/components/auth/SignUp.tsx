// client/src/app/components/auth/SignUp.tsx
'use client'

import { useState } from 'react'
import { signUp } from '../../services/auth'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import styles from './SignUp.module.css'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const handleSignUp = async () => {
    console.log('Sign Up button clicked')

    if (!username || !email || !password) {
      setErrors(['Please fill in all fields'])
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrors(['Please enter a valid email address'])
      return
    }

    try {
      const response = await signUp(username, email, password)
      console.log('Signed up successfully', response.data)
      setErrors([])
    } catch (err: unknown) {
      console.error('Error signing up', err)
      if (axios.isAxiosError(err)) {
        console.log('Axios error response:', err.response) // Log the error response
        if (err.response?.status === 400) {
          console.log('Siku Siku Mocz')
          setErrors(['Sign up failed'])
        } else {
          setErrors([
            err.response?.data?.error || 'An unexpected error occurred',
          ])
        }
      } else {
        setErrors(['An unexpected error occurred'])
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
      {errors && <p className={styles.error}>{errors}</p>}
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
