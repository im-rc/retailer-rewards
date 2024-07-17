import { fetchTransactions } from '../api/transactions';

// Mock the setTimeout function
jest.useFakeTimers();

describe('fetchTransactions', () => {
    it('should return transactions after a delay', async () => {
        const promise = fetchTransactions();
        
        // Fast-forward until all timers have been executed
        jest.runAllTimers();

        const result = await promise;

        expect(result).toEqual([
            { customerId: 1, name: 'John Doe', date: '2024-05-15', amount: 120 },
            { customerId: 2, name: 'Jane Smith', date: '2024-05-17', amount: 90 },
            { customerId: 1, name: 'John Doe', date: '2024-06-20', amount: 200 },
            { customerId: 2, name: 'Jane Smith', date: '2024-06-25', amount: 150 },
            { customerId: 1, name: 'John Doe', date: '2024-07-02', amount: 50 },
            { customerId: 2, name: 'Jane Smith', date: '2024-07-04', amount: 100 },
            { customerId: 3, name: 'Michael Brown', date: '2024-05-10', amount: 180 },
            { customerId: 3, name: 'Michael Brown', date: '2024-06-15', amount: 220 },
            { customerId: 3, name: 'Michael Brown', date: '2024-07-20', amount: 80 },
        ]);
    });
});
