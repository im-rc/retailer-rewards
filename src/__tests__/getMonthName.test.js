// getMonthName.test.js

import { getMonthName } from '../utils/monthNames';

describe('getMonthName', () => {
    test('returns correct month names for valid month numbers', () => {
        expect(getMonthName(1)).toBe('January');
        expect(getMonthName(2)).toBe('February');
        expect(getMonthName(3)).toBe('March');
        expect(getMonthName(4)).toBe('April');
        expect(getMonthName(5)).toBe('May');
        expect(getMonthName(6)).toBe('June');
        expect(getMonthName(7)).toBe('July');
        expect(getMonthName(8)).toBe('August');
        expect(getMonthName(9)).toBe('September');
        expect(getMonthName(10)).toBe('October');
        expect(getMonthName(11)).toBe('November');
        expect(getMonthName(12)).toBe('December');
    });

    test('returns undefined for invalid month numbers', () => {
        expect(getMonthName(0)).toBeUndefined();
        expect(getMonthName(13)).toBeUndefined();
        expect(getMonthName(-1)).toBeUndefined();
        expect(getMonthName(100)).toBeUndefined();
    });

    test('returns undefined for non-numeric inputs', () => {
        expect(getMonthName('January')).toBeUndefined();
        expect(getMonthName(null)).toBeUndefined();
        expect(getMonthName(undefined)).toBeUndefined();
        expect(getMonthName({})).toBeUndefined();
    });
});
