import {
    BoFilter
} from '../../packages/BoFilter/src/main.js'

describe('BoFilter', () => {
    describe('number', () => {
        it('1235 should be 1,235', () => {
            const result = BoFilter(1235, 'number')
            expect(result).toBe('1,235')
        });

        it('0 should be 0', () => {
            const result = BoFilter(0, 'number')
            expect(result).toBe(0)
        });

        it('null should be 0', () => {
            const result = BoFilter(null, 'number')
            expect(result).toBe(0)
        });
    });

    describe('currency', () => {
        it('1235 should be 12.35', () => {
            const result = BoFilter(1235, 'currency')
            expect(result).toBe(12.35)
        });

        it('0 should be 0', () => {
            const result = BoFilter(0, 'currency')
            expect(result).toBe(0)
        });

        it('null should be 0', () => {
            const result = BoFilter(null, 'currency')
            expect(result).toBe(0)
        });
    });

    describe('date', () => {
        it('20211221 should be 2021/12/21', () => {
            const result = BoFilter('20211221', 'date')
            expect(result).toBe('2021/12/21')
        });

        it('1635218799 should be 2021/10/26 11:26:39', () => {
            const result = BoFilter(1635218799, 'date')
            expect(result).toBe('2021/10/26 11:26:39')
        });

        it('null should be -', () => {
            const result = BoFilter(null, 'date')
            expect(result).toBe('-')
        });
    });

    describe('date', () => {
        it('258 should be ♦2', () => {
            const result = BoFilter(258, 'card')
            expect(result).toBe('♦2')
        });

        it('[258, 514, 770, 1026] should be ♦2,♣2,♥2,♠2', () => {
            const result = BoFilter([258, 514, 770, 1026], 'card')
            expect(result).toBe('♦2,♣2,♥2,♠2')
        });

        it('null should be -', () => {
            const result = BoFilter(null, 'card')
            expect(result).toBe('-')
        });
    });

    describe('currency|number', () => {
        it('1212121 should be 12,121.21', () => {
            const result = BoFilter(1212121, 'currency|number')
            expect(result).toBe('12,121.21')
        });

        it('null should be 0', () => {
            const result = BoFilter(null, 'currency|number')
            expect(result).toBe(0)
        });
    });
});