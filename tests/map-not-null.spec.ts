import { toExtendedIterable } from '../src';

describe('mapNotNull', () => {
    const createData = () => [
        null,
        undefined,
        1,
        2,
        null,
        3,
        4,
        undefined,
        5,
        6,
    ];

    it('should map to string', () => {
        const data = createData();
        const expectedData = data.filter(x => !!x).map(x => x!.toString());

        const mappedData = toExtendedIterable(data)
            .mapNotNull(x => x?.toString())
            .toList();

        expect(mappedData).toEqual(expectedData);
    });

    it('should be called only on filtered data', () => {
        const data = createData();

        const expectedCalledTime = data.filter(x => !!x).length;

        let calledTimes = 0;

        toExtendedIterable(data)
            .mapNotNull(x => x)
            .mapNotNull(x => {
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

        toExtendedIterable(data)
            .mapNotNull(x => x)
            .mapNotNull(x => {
                calledTimes++;
                return x;
            });

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called equal to taken elements', () => {
        const data = createData();
        const take = 3;

        const expectedCalledTimes = data.filter(x => !x).length - take;
        let calledTimes = 0;

        toExtendedIterable(data)
            .take(take)
            .mapNotNull(x => x)
            .mapNotNull(x => {
                calledTimes++;
                return x;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called equal with less than skipped elements count', () => {
        const data = createData();
        const skip = 3;

        const expectedCalledTimes = data.slice(skip).filter(x => !!x).length;
        let calledTimes = 0;

        toExtendedIterable(data)
            .skip(skip)
            .mapNotNull(x => x)
            .mapNotNull(x => {
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
            .mapNotNull(() => {
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
            .mapNotNull(() => {
                calledTimes++;
                return true;
            })
            .firstOrNull();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });
});
