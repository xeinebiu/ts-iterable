import { asIterable } from '../src';

describe('sort', () => {
    const createData = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    it('should sort descending', () => {
        const data = createData();

        const expectedData = [...data].sort((a, b) => b - a);

        const sortedData = asIterable(data)
            .sort((a, b) => b - a)
            .toList();

        expect(sortedData).toEqual(expectedData);
    });
});
