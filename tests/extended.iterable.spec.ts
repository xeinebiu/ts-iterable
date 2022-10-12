import { toExtendedIterable } from '../src';
import { DefaultExtendedIterable } from '../src/default/default.extended-iterable';

describe('extendedIterable', () => {
    it('should be extended iterable', () => {
        const data = [1, 2, 3];

        const extendedIterable = toExtendedIterable(data);

        expect(extendedIterable).toBeInstanceOf(DefaultExtendedIterable);
    });
});
