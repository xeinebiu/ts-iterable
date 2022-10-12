import {toExtendedIterable} from "../src";

describe("all", () => {
    const createData = () => [1, 2, 3, 4, 5, 6];

    it("should return true", () => {
        const data = createData();

        const expected = true;
        const result = toExtendedIterable(data)
            .all(x => x.toString() !== "hello world");

        expect(result).toEqual(expected);
    });

    it("should return false", () => {
        const data = createData();

        const expected = false;
        const result = toExtendedIterable(data)
            .all(x => x.toString() === "1");

        expect(result).toEqual(expected);
    });
});