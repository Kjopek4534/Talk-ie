import Link from 'next/link'
import styles from './styles/page.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Talk'ie</h1>
      <Link href="/auth/signin" className={styles.button}>
        Log In
      </Link>
      <Link href="/auth/signup" className={styles.button}>
        Sign Up
      </Link>
    </div>
  )
}
