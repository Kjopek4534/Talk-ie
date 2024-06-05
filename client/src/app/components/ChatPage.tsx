'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Chat {
  id: number
  name: string
  receiveNotifications: boolean
}

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchUserAndChats = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const userResponse = await axios.get<{ id: number }>(
          'http://localhost:5000/users/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        const userId = userResponse.data.id

        const chatsResponse = await axios.get<Chat[]>(
          `http://localhost:5000/users/${userId}/chats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setChats(chatsResponse.data)
      } catch (error) {
        console.error('Error fetching user or chats', error)
        setError('Error fetching user or chats')
      }
    }
  }

  useEffect(() => {
    fetchUserAndChats()
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Chats</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <a href={`/chats/${chat.id}`}>{chat.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatPage
