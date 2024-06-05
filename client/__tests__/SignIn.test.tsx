import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignIn from '@/app/components/auth/SignIn'
import { signIn } from '@/app/services/auth'

jest.mock('@/app/services/auth', () => ({
  signIn: jest.fn(),
}))

const mockedSignIn = signIn as jest.MockedFunction<typeof signIn>

describe('SignIn', () => {
  beforeEach(() => {
    mockedSignIn.mockClear()
  })

  it('renders the sign in form', () => {
    render(<SignIn />)

    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const signInButton = screen.getByText('Log In')
    const signUpLink = screen.getByText('Sign Up')

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(signInButton).toBeInTheDocument()
    expect(signUpLink).toBeInTheDocument()
  })

  it('calls signIn function with correct arguments when Log In button is clicked', async () => {
    render(<SignIn />)

    const username = 'testuser'
    const password = 'testpassword'
    const signInButton = screen.getByText('Log In')

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: username },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: password },
    })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledWith(username, password)
    })
  })
  /*
  it('displays error message for invalid credentials', async () => {
    const errorMessage = 'Invalid username or password'
    mockedSignIn.mockRejectedValueOnce({ response: { status: 401 } })

    render(<SignIn />)

    const signInButton = screen.getByText('Log In')

    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })
*/
  it('displays error message for unexpected errors', async () => {
    const errorMessage = 'An unexpected error occurred'
    mockedSignIn.mockRejectedValueOnce({
      response: { status: 500, data: { error: errorMessage } },
    })

    render(<SignIn />)

    const signInButton = screen.getByText('Log In')

    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })
})
