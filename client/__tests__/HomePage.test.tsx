import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders the sign up page', () => {
    render(<HomePage />) //Arrange

    const myElement = screen.getByText(/Sign Up/i) //Act
    expect(myElement).toBeInTheDocument() //Assert
  })
})
