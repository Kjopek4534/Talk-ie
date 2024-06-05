import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatDetailPage from '@/app/components/ChatDetailPage';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/navigation');
jest.mock('axios');

const mockUseRouter = useRouter as jest.Mock;
const mockUseParams = useParams as jest.Mock;
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ChatDetailPage', () => {
    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            push: jest.fn(),
        });
        mockUseParams.mockReturnValue({
            chatId: '1',
        });
        mockedAxios.get.mockClear();
        mockedAxios.post.mockClear();
        localStorage.setItem('token', 'fake-token');
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('renders the chat detail page', async () => {
        mockedAxios.get
            .mockResolvedValueOnce({
                data: [
                    { id: 1, username: 'User1' },
                    { id: 2, username: 'User2' },
                ],
            })
            .mockResolvedValueOnce({
                data: { id: 1 },
            })
            .mockResolvedValueOnce({
                data: [
                    { id: 1, content: 'Hello', sentAt: '2023-01-01', userID: 1 },
                    { id: 2, content: 'Hi', sentAt: '2023-01-01', userID: 2 },
                ],
            });

        render(<ChatDetailPage />);

        await waitFor(() => {
            expect(screen.getByText('Hello')).toBeInTheDocument();
            expect(screen.getByText('Hi')).toBeInTheDocument();
        });
    });

    it('displays an error message if fetching messages fails', async () => {
        mockedAxios.get
            .mockResolvedValueOnce({
                data: [
                    { id: 1, username: 'User1' },
                    { id: 2, username: 'User2' },
                ],
            })
            .mockResolvedValueOnce({
                data: { id: 1 },
            });

        mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching messages'));

        render(<ChatDetailPage />);

        await waitFor(() => {
            expect(screen.getByText('Error fetching messages')).toBeInTheDocument();
        });
    });
});
