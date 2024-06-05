'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import styles from '../styles/ChatDetailPage.module.css'

interface Message {
  id: number
  content: string
  sentAt: string
  userID: number
}

interface User {
  id: number
  username: string
}

const ChatDetailPage = () => {
  const router = useRouter()
  const params = useParams()
  const chatId = Array.isArray(params.chatId) ? params.chatId[0] : params.chatId
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const [userMap, setUserMap] = useState<{ [key: number]: string }>({})
  const [newMessage, setNewMessage] = useState<string>('')

  const fetchUsers = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const usersResponse = await axios.get<User[]>(
          'http://localhost:5000/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const userMap = usersResponse.data.reduce(
          (acc, user) => {
            acc[user.id] = user.username
            return acc
          },
          {} as { [key: number]: string },
        )

        setUserMap(userMap)
      } catch (error) {
        console.error('Error fetching users', error)
        setError('Error fetching users')
      }
    }
  }

  const fetchMessages = async (chatId: number) => {
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
        setCurrentUserId(userResponse.data.id)

        const messagesResponse = await axios.get<Message[]>(
          `http://localhost:5000/messages/chats/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        setMessages(messagesResponse.data)
      } catch (error) {
        console.error('Error fetching messages', error)
        setError('Error fetching messages')
      }
    }
  }

  const handleSendMessage = async () => {
    const token = localStorage.getItem('token')
    if (token && newMessage.trim()) {
      try {
        const response = await axios.post<Message>(
          `http://localhost:5000/messages`,
          {
            chatID: parseInt(chatId, 10),
            content: newMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setMessages([...messages, response.data])
        setNewMessage('')
      } catch (error) {
        console.error('Error sending message', error)
        setError('Error sending message')
      }
    }
  }

  useEffect(() => {
    if (chatId) {
      fetchUsers()
      fetchMessages(Number(chatId))
    }
  }, [chatId])

  const handleGoBack = () => {
    router.push('/chats')
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className={styles.chatContainer}>
      <h1>Chat Messages</h1>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go Back
      </button>
      <ul className={styles.messageList}>
        {messages.map((message) => (
          <li
            key={message.id}
            className={`${styles.messageItem} ${message.userID === currentUserId ? styles.myMessage : styles.otherMessage}`}
          >
            <span className={styles.messageUser}>
              {userMap[message.userID] || 'Unknown User'}
            </span>
            <p className={styles.messageContent}>{message.content}</p>
          </li>
        ))}
      </ul>
      <div className={styles.messageInputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.messageInput}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className={styles.sendMessageButton}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatDetailPage
