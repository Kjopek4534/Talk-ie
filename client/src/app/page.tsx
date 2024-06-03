// client/src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles/page.module.css'

export const metadata = {
  title: "Talk'ie - Let's talk",
}

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Image
        src="/logo.png"
        alt="Talk'ie Logo"
        width={150}
        height={150}
        className={styles.logo}
      />
      <h1 className={styles.title}>Talk'ie</h1>
      <div className={styles.buttonContainer}>
        <Link href="/auth/signin" className={styles.button}>
          Log In
        </Link>
        <div className={styles.orContainer}>
          <span className={styles.line}></span>
          <span className={styles.orText}>or</span>
          <span className={styles.line}></span>
        </div>
        <Link href="/auth/signup" className={styles.button}>
          Sign Up
        </Link>
      </div>
    </div>
  )
}
