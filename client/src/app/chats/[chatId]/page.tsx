import dynamic from 'next/dynamic'

const ChatDetailPage = dynamic(
  () => import('../../components/ChatDetailPage'),
  { ssr: false },
)

export default ChatDetailPage
