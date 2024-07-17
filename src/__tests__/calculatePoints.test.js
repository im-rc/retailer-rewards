// calculatePoints.test.js

import { calculatePoints } from '../utils/calculatePoints';

describe('calculatePoints', () => {
    test('returns 0 points for amounts <= 50', () => {
        expect(calculatePoints(50)).toBe(0);
        expect(calculatePoints(0)).toBe(0);
        expect(calculatePoints(49)).toBe(0);
    });

    test('returns correct points for amounts > 50 and <= 100', () => {
        expect(calculatePoints(51)).toBe(1);
        expect(calculatePoints(75)).toBe(25);
        expect(calculatePoints(100)).toBe(50);
    });

    test('returns correct points for amounts > 100', () => {
        expect(calculatePoints(101)).toBe(52); // 2 points for amount over 100 and 50 points for amount over 50
        expect(calculatePoints(150)).toBe(150); // 100 points for 50 over 100 and 50 points for amount over 50
        expect(calculatePoints(200)).toBe(250); // 200 points for 100 over 100 and 50 points for amount over 50
    });
});
