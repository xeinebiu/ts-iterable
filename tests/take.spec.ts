import { toExtendedIterable } from '../src';

describe('take', () => {
    const createData = () => [1, 2, 3, 4, 5, 6];

    it('should take top 3', () => {
        const data = createData();
        const take = 3;
        const expected = data.slice(0, take);

        const taken = toExtendedIterable(data).take(take).toList();

        expect(taken).toEqual(expected);
    });
});
