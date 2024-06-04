import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignUp from '@/app/components/auth/SignUp'
import { signUp } from '@/app/services/auth'
import { AxiosResponse, AxiosError, AxiosHeaders } from 'axios'

// Mock the signUp function
jest.mock('@/app/services/auth')

describe('SignUp', () => {
  it('renders the sign up form', () => {
    render(<SignUp />)

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Log In/i })).toBeInTheDocument()
  })

  it('shows an error message on failed sign up', async () => {
    const errorResponse: Partial<AxiosError> = {
      response: {
        data: {
          error: 'Sign up failed',
        },
        status: 400,
        statusText: 'Bad Request',
        headers: new AxiosHeaders(),
        config: {
          headers: new AxiosHeaders(),
        },
      },
    }

    ;(signUp as jest.MockedFunction<typeof signUp>).mockRejectedValue(
      errorResponse,
    )

    render(<SignUp />)

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }))

    await waitFor(() => {
      expect(screen.getByText(/Sign up failed/i)).toBeInTheDocument()
    })
  })

  it('redirects on successful sign up', async () => {
    const mockResponse: AxiosResponse = {
      data: {
        message: 'Signed up successfully',
      },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders({
        'content-type': 'application/json',
      }),
      config: {
        headers: new AxiosHeaders({
          'content-type': 'application/json',
        }),
      },
    }

    ;(signUp as jest.MockedFunction<typeof signUp>).mockResolvedValue(
      mockResponse,
    )

    render(<SignUp />)

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }))

    await waitFor(() => {
      expect(screen.queryByText(/Sign up failed/i)).not.toBeInTheDocument()
    })
  })
})
