import { render, screen, waitFor } from '@testing-library/react';
import MainPage from '@/app/components/MainPage';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MainPage', () => {
    beforeEach(() => {
        mockedAxios.get.mockClear();
        localStorage.setItem('token', 'fake-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('renders the main page', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Chat 1' },
                { id: 2, name: 'Chat 2' },
            ],
        });

        render(<MainPage />);

        await waitFor(() => {
            expect(screen.getByText('Your Chats')).toBeInTheDocument();
            expect(screen.getByText('Chat 1')).toBeInTheDocument();
            expect(screen.getByText('Chat 2')).toBeInTheDocument();
        });
    });

    it('displays an error message if fetching chats fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching chats'));

        render(<MainPage />);

        await waitFor(() => {
            expect(screen.getByText('Error fetching chats')).toBeInTheDocument();
        });
    });
});
