import { toExtendedIterable } from '../src';

describe('map', () => {
    const createData = () => [1, 2, 3, 4, 5, 6];

    it('should map to string', () => {
        const data = createData();
        const expectedData = data.map(x => x.toString());

        const mappedData = toExtendedIterable(data)
            .map(x => x.toString())
            .toList();

        expect(mappedData).toEqual(expectedData);
    });

    it('should be called only on filtered data', () => {
        const data = createData();

        const expectedCalledTime = data.filter(x => x > 2).length;

        let calledTimes = 0;

        toExtendedIterable(data)
            .where(x => x > 2)
            .map(x => {
                calledTimes++;
                return x;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTime);
    });

    it('should not be called', () => {
        const data = createData();

        const expectedCalledTimes = 0;
        let calledTimes = 0;

        toExtendedIterable(data).map(x => {
            calledTimes++;
            return x;
        });

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called equal to taken elements', () => {
        const data = createData();
        const take = 3;

        const expectedCalledTimes = take;
        let calledTimes = 0;

        toExtendedIterable(data)
            .take(take)
            .map(x => {
                calledTimes++;
                return x;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called equal with less than skipped elements count', () => {
        const data = createData();
        const skip = 3;

        const expectedCalledTimes = data.length - skip;
        let calledTimes = 0;

        toExtendedIterable(data)
            .skip(skip)
            .map(x => {
                calledTimes++;
                return x;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called once', () => {
        const data = createData();

        const expectedCalledTimes = 1;
        let calledTimes = 0;

        toExtendedIterable(data)
            .map(() => {
                calledTimes++;
                return true;
            })
            .first();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called once 2', () => {
        const data = createData();

        const expectedCalledTimes = 1;
        let calledTimes = 0;

        toExtendedIterable(data)
            .map(() => {
                calledTimes++;
                return true;
            })
            .firstOrNull();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });
});
