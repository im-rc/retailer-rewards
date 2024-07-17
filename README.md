# Retailer Rewards

The Retailer Rewards App is a React application that displays customer rewards points based on their transaction history. The app fetches transactions from an API, calculates reward points, and displays them grouped by customers.

![Customer Rewards](./public/screenshot.png)

## Features

- Fetch transactions from an API (simulated)
- Calculate reward points based on transaction amounts
- Display rewards grouped by customers
- Show monthly and total points for each customer
- Error handling and loading states

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/im-rc/retailer-rewards.git
   cd retailer-rewards
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and go to:

   ```
   http://localhost:3000
   ```

3. You should see the Retailer Rewards App interface.

## Running Tests

1. Run unit tests:

   ```bash
   npm test
   ```

2. The test suite includes tests for the following components and functions:
   - `CustomerRewards` component
   - `calculatePoints` utility function
   - `getMonthName` utility function
