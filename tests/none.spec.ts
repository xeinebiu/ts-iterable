import { asIterable } from '../src';

describe('none', () => {
    const createData = () => [1, 2, 3, 4, 5, 6];

    it('should return true', () => {
        const data = createData();

        const expected = true;
        const result = asIterable(data).none(
            x => x.toString() === 'hello world',
        );

        expect(result).toEqual(expected);
    });

    it('should return false', () => {
        const data = createData();

        const expected = false;
        const result = asIterable(data).none(x => x.toString() === '1');

        expect(result).toEqual(expected);
    });
});
