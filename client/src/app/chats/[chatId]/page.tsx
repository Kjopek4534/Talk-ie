import dynamic from 'next/dynamic'

export const metadata = {
    title: "Talk'ie - Chat with [Username]",
}

const ChatDetailPage = dynamic(
  () => import('../../components/ChatDetailPage'),
  { ssr: false },
)

export default ChatDetailPage
