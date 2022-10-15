import { asIterable } from '../src';

describe('filter', () => {
    const createData = () => [1, 2, 3, 4, 5, 6];

    it('should filter data', () => {
        const data = createData();
        const expected = [1, 2, 3];

        const filtered = asIterable(data)
            .filter(x => x < 4)
            .toList();

        expect(filtered).toEqual(expected);
    });

    it('should be called equal to data size', () => {
        const data = createData();

        const expectedCalledTimes = data.length;
        let calledTimes = 0;

        asIterable(data)
            .filter(() => {
                calledTimes++;
                return true;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should not be called', () => {
        const data = createData();

        const expectedCalledTimes = 0;
        let calledTimes = 0;

        asIterable(data).filter(x => {
            calledTimes++;
            return true;
        });

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called once', () => {
        const data = createData();
        data.push(-1);

        const expectedCalledTimes = 1;
        let calledTimes = 0;

        asIterable(data)
            .filter(x => x === -1)
            .filter(() => {
                calledTimes++;
                return true;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called equal to taken elements', () => {
        const data = createData();
        const take = 3;

        const expectedCalledTimes = take;
        let calledTimes = 0;

        asIterable(data)
            .take(take)
            .filter(() => {
                calledTimes++;
                return true;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called equal with less than skipped elements count', () => {
        const data = createData();
        const skip = 3;

        const expectedCalledTimes = data.length - skip;
        let calledTimes = 0;

        asIterable(data)
            .skip(skip)
            .filter(() => {
                calledTimes++;
                return true;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it('should be called once', () => {
        const data = createData();

        const expectedCalledTimes = 1;
        let calledTimes = 0;

        asIterable(data)
            .filter(() => {
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

        asIterable(data)
            .filter(() => {
                calledTimes++;
                return true;
            })
            .firstOrNull();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });
});
