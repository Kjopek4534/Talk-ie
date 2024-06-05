'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '@/app/styles/MainPage.module.css';

const MainPage = () => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/users/chats', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chats', error);
                setError('Error fetching chats');
            }
        };

        fetchChats();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

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
    );
};

export default MainPage;
