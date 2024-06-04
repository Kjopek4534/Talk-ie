import { render, screen } from '@testing-library/react'
import SignInPage from '@/app/auth/signin/page'

describe('SignInPage', () => {
  it('renders the sign in page', () => {
    render(<SignInPage />) //Arrange

    const myElement = screen.getByText(/Sign Up/i) //Act
    expect(myElement).toBeInTheDocument() //Assert
  })
})
