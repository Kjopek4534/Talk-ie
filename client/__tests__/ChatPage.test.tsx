import { render, screen } from '@testing-library/react'
import ChatPage from '@/app/chats/page'

describe('ChatPage', () => {
    it('renders the home page', () => {
        render(<ChatPage />) //Arrange

        const myElement = screen.getByText(/Sign Up/i) //Act
        expect(myElement).toBeInTheDocument() //Assert
    })
})
