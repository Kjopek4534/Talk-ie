'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import styles from '@/app/styles/MainPage.module.css'

const MainPage = () => {
  const [chats, setChats] = useState([])

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/users/chats', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setChats(response.data)
    }

    fetchChats()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Your Chats</h1>
      <ul>
        {chats.map((chat: any) => (
          <li key={chat.id}>
            <Link href={`/chats/${chat.id}`}>{chat.name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/create-chat">
        <button>Create New Chat</button>
      </Link>
    </div>
  )
}

export default MainPage
