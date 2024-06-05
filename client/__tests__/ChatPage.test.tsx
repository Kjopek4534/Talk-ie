import { render, screen, waitFor } from '@testing-library/react';
import ChatPage from '@/app/components/ChatPage';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ChatPage', () => {
    beforeEach(() => {
        mockedAxios.get.mockClear();
        localStorage.setItem('token', 'fake-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('renders the chat page', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { id: 1 },
        });

        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Chat 1', receiveNotifications: false },
                { id: 2, name: 'Chat 2', receiveNotifications: false },
            ],
        });

        render(<ChatPage />);

        await waitFor(() => {
            expect(screen.getByText("Your Talk'ies")).toBeInTheDocument();
        });
    });

    it('populates the chat list correctly', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { id: 1 },
        });

        mockedAxios.get.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Chat 1', receiveNotifications: false },
                { id: 2, name: 'Chat 2', receiveNotifications: false },
            ],
        });

        render(<ChatPage />);

        await waitFor(() => {
            expect(screen.getByText('Chat 1')).toBeInTheDocument();
            expect(screen.getByText('Chat 2')).toBeInTheDocument();
        });
    });

    it('displays an error message if fetching user or chats fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching user or chats'));

        render(<ChatPage />);

        await waitFor(() => {
            expect(screen.getByText('Error fetching user or chats')).toBeInTheDocument();
        });
    });
});
