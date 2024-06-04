import { render, screen } from '@testing-library/react'
import SignUpPage from '@/app/auth/signup/page'

describe('SignUpPage', () => {
  it('renders the sign up page', () => {
    render(<SignUpPage />) //Arrange

    const myElement = screen.getByText(/Sign Up/i) //Act
    expect(myElement).toBeInTheDocument() //Assert
  })
})
