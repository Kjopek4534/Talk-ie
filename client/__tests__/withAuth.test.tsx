import React from 'react';
import { render, waitFor } from '@testing-library/react';
import withAuth from '@/app/components/auth/withAuth';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom/extend-expect'; // Ensure this is imported

// Mocking next/router
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

// Mock component to wrap
const MockComponent = () => <div>Protected Content</div>;

// Component with HOC applied
const ProtectedComponent = withAuth(MockComponent);

describe('withAuth HOC', () => {
    let pushMock: jest.Mock;

    beforeEach(() => {
        pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
        localStorage.clear();
    });

    it('redirects to /auth/signin if no token is present', async () => {
        render(<ProtectedComponent />);

        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/auth/signin');
        });
    });

    it('renders the wrapped component if a token is present', async () => {
        localStorage.setItem('token', 'fake-token');
        const { getByText } = render(<ProtectedComponent />);

        await waitFor(() => {
            expect(pushMock).not.toHaveBeenCalled();
            expect(getByText('Protected Content')).toBeInTheDocument();
        });
    });
});
