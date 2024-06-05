import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SignIn from '@/app/components/auth/SignIn';
import { useRouter } from 'next/navigation';
import { signIn } from '@/app/services/auth';
import '@testing-library/jest-dom/extend-expect';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock the signIn function
jest.mock('@/app/services/auth', () => ({
    signIn: jest.fn(),
}));

describe('SignIn Component', () => {
    const pushMock = jest.fn();
    const signInMock = signIn as jest.Mock;

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays a general error message if sign in fails with an unexpected error', async () => {
        const errorMessage = 'An unexpected error occurred';
        signInMock.mockRejectedValueOnce({ response: { data: { error: errorMessage } } });

        render(<SignIn />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

        fireEvent.click(screen.getByText('Log In'));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    it('redirects to the chats page on successful sign in', async () => {
        const token = 'mocked-token';
        signInMock.mockResolvedValueOnce({ data: { access_token: token } });

        render(<SignIn />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

        fireEvent.click(screen.getByText('Log In'));

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
            expect(pushMock).toHaveBeenCalledWith('/chats');
        });
    });
});
