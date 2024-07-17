import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../api/transactions';
import { calculatePoints } from '../utils/calculatePoints';
import { getMonthName } from '../utils/monthNames';
import './customerRewards.css'

// Function to group array elements by a specified key
const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        // Grouping logic: create an array for each unique key value
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
};

// React component for displaying customer rewards
const CustomerRewards = () => {
    // State hooks for managing transactions and error handling
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    // Fetch transactions from API when component mounts
    useEffect(() => {
        fetchTransactions()
            .then(data => setTransactions(data)) // Set transaction data on successful fetch
            .catch(err => setError(err)); // Handle error if fetch fails
    }, []); // Empty dependency array ensures effect runs only once on mount

    // Render error message if there's an error
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Render loading indicator if transactions are still loading
    if (transactions.length === 0) {
        return <>
        <div className='loader'></div>
        <p>loading ...</p>
        </>;
    }

    // Group transactions by customer ID
    const groupedByCustomer = groupBy(transactions, 'customerId');

    // Calculate customer points based on transaction data
    const customerPoints = Object.entries(groupedByCustomer).map(([customerId, customerTransactions]) => {
        // Extract customer name from the first transaction
        const name = customerTransactions[0].name;

        // Calculate monthly points for each customer
        const monthlyPoints = customerTransactions.reduce((acc, { date, amount }) => {
            const month = new Date(date).getMonth() + 1; // Get month (1-based index)
            const points = calculatePoints(amount); // Calculate points for the transaction amount

            // Accumulate points for each month
            if (!acc[month]) acc[month] = 0;
            acc[month] += points;
            return acc;
        }, {});

        // Calculate total points accumulated by the customer
        const totalPoints = Object.values(monthlyPoints).reduce((acc, points) => acc + points, 0);

        // Return object with customerId, name, monthlyPoints, and totalPoints
        return { customerId, name, monthlyPoints, totalPoints };
    });

    // Render customer rewards data once transactions are loaded
    return (
        <div>
            <div className="header">
                <h1>Customer Rewards</h1>
            </div>
            {/* Render each customer's rewards data */}
            {customerPoints.map(({ customerId, name, monthlyPoints, totalPoints }) => (
                <div key={customerId} className='card'>
                    <h2>{name}</h2>
                    {/* Render monthly points for each customer */}
                    {Object.entries(monthlyPoints).map(([month, points]) => (
                        <p key={month}>{getMonthName(month)}: {points} points</p>
                    ))}
                    <hr />
                    <p><b>Total Points: {totalPoints}</b></p>
                </div>
            ))}
        </div>
    );
};

export default CustomerRewards;
