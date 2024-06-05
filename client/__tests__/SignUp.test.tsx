import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SignUp from '@/app/components/auth/SignUp';
import { useRouter } from 'next/navigation';
import { signUp } from '@/app/services/auth';
import '@testing-library/jest-dom/extend-expect';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock the signUp function
jest.mock('@/app/services/auth', () => ({
    signUp: jest.fn(),
}));

describe('SignUp Component', () => {
    const pushMock = jest.fn();
    const signUpMock = signUp as jest.Mock;

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays an error message if sign up fails', async () => {
        const errorMessage = 'An unexpected error occurred';
        signUpMock.mockRejectedValueOnce({ response: { data: { error: errorMessage } } });

        render(<SignUp />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Jan' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'SikuSikuMocz!1' } });

        fireEvent.click(screen.getByText('Sign Up'));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    it('redirects to the sign-in page on successful sign up', async () => {
        signUpMock.mockResolvedValueOnce({ data: {} });

        render(<SignUp />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Jan' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'SikuSikuMocz!1' } });

        fireEvent.click(screen.getByText('Sign Up'));

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/auth/signin');
        });
    });
});
