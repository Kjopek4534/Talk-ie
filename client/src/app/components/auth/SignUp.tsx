'use client'

import { useState } from 'react'
import { signUp } from '../../services/auth'
import Link from 'next/link'
import styles from './SignUp.module.css'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    try {
      const response = await signUp(username, email, password)
      console.log('Signed up successfully', response.data)
    } catch (error) {
      console.error('Error signing up', error)
    }
  }

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
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
