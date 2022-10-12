import {toExtendedIterable} from "../src";

describe("where", () => {
    const createData = () => [1, 2, 3, 4, 5, 6];

    it("should filter data", () => {
        const data = createData();
        const expected = [1, 2, 3];

        const filtered = toExtendedIterable(data)
            .where(x => x < 4)
            .toList();

        expect(filtered).toEqual(expected);
    });

    it("should be called equal to data size", () => {
        const data = createData();

        const expectedCalledTimes = data.length;
        let calledTimes = 0;

        toExtendedIterable(data)
            .where((x) => {
                calledTimes++;
                return true;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it("should not be called", () => {
        const data = createData();

        const expectedCalledTimes = 0;
        let calledTimes = 0;

        toExtendedIterable(data)
            .where((x) => {
                calledTimes++;
                return true;
            })

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it("should be called once", () => {
        const data = createData();
        data.push(-1);

        const expectedCalledTimes = 1;
        let calledTimes = 0;

        toExtendedIterable(data)
            .where(x => x === -1)
            .where(() => {
                calledTimes++;
                return true;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it("should be called equal to taken elements", () => {
        const data = createData();
        const take = 3;

        const expectedCalledTimes = take;
        let calledTimes = 0;

        toExtendedIterable(data)
            .take(take)
            .where(() => {
                calledTimes++;
                return true;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it("should be called equal with less than skipped elements count", () => {
        const data = createData();
        const skip = 3;

        const expectedCalledTimes = data.length - skip;
        let calledTimes = 0;

        toExtendedIterable(data)
            .skip(skip)
            .where(() => {
                calledTimes++;
                return true;
            })
            .toList();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it("should be called once", () => {
        const data = createData();

        const expectedCalledTimes = 1;
        let calledTimes = 0;

        toExtendedIterable(data)
            .where(() => {
                calledTimes++;
                return true;
            })
            .first();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });

    it("should be called once 2", () => {
        const data = createData();

        const expectedCalledTimes = 1;
        let calledTimes = 0;

        toExtendedIterable(data)
            .where(() => {
                calledTimes++;
                return true;
            })
            .firstOrNull();

        expect(calledTimes).toEqual(expectedCalledTimes);
    });
});