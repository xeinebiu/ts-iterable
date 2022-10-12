import { toExtendedIterable } from '../src';

describe('grouped', () => {
    const createData = () => [
        -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ];

    it('should group by positive & negative', () => {
        const data = createData();

        const expectedData = [
            ['negative', [-9, -8, -7, -6, -5, -4, -3, -2, -1]],
            ['positive', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
        ];

        const groupedData = toExtendedIterable(data)
            .grouped(x => {
                if (x < 0) return 'negative';
                return 'positive';
            })
            .toList();

        expect(groupedData).toEqual(expectedData);
    });
});
