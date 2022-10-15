import { asIterable } from '../src';

describe('skipp', () => {
    const createData = () => [1, 2, 3, 4, 5, 6];

    it('should skip first 3', () => {
        const data = createData();
        const skip = 3;
        const expected = data.slice(skip);

        const taken = asIterable(data).skip(skip).toList();

        expect(taken).toEqual(expected);
    });
});
