// CustomerRewards.test.js

import React,{act} from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerRewards from '../components/CustomerRewards';
import { fetchTransactions } from '../api/transactions';

// Mock the fetchTransactions function
jest.mock('../api/transactions');

const mockTransactions = [
    { customerId: 1, name: 'John Doe', date: '2024-05-15', amount: 120 },
    { customerId: 2, name: 'Jane Smith', date: '2024-05-17', amount: 90 },
    { customerId: 1, name: 'John Doe', date: '2024-06-20', amount: 200 },
    { customerId: 2, name: 'Jane Smith', date: '2024-06-25', amount: 150 },
    { customerId: 1, name: 'John Doe', date: '2024-07-02', amount: 50 },
    { customerId: 2, name: 'Jane Smith', date: '2024-07-04', amount: 100 },
    { customerId: 3, name: 'Michael Brown', date: '2024-05-10', amount: 180 },
    { customerId: 3, name: 'Michael Brown', date: '2024-06-15', amount: 220 },
    { customerId: 3, name: 'Michael Brown', date: '2024-07-20', amount: 80 },
];

// Helper function to mock calculatePoints
jest.mock('../utils/calculatePoints', () => ({
    calculatePoints: (amount) => {
        // Mock the calculation logic, for example:
        if (amount > 100) return 2 * (amount - 100);
        if (amount > 50) return amount - 50;
        return 0;
    },
}));

// Helper function to mock getMonthName
jest.mock('../utils/monthNames', () => ({
    getMonthName: (month) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[month - 1];
    },
}));

describe('CustomerRewards', () => {
    test('renders loading state initially', async () => {
        fetchTransactions.mockResolvedValueOnce([]);
        await act(async () => {
            render(<CustomerRewards />);
        });
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders error message on fetch failure', async () => {
        fetchTransactions.mockRejectedValueOnce(new Error('Failed to fetch'));
        await act(async () => {
            render(<CustomerRewards />);
        });
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    test('renders customer rewards data on successful fetch', async () => {
        fetchTransactions.mockResolvedValueOnce(mockTransactions);
        await act(async () => {
            render(<CustomerRewards />);
        });

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('Michael Brown')).toBeInTheDocument();
        });
    });
});
