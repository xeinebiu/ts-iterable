import { DefaultExtendedIterable } from './default/default.extended-iterable';
import { DefaultIterator } from './default/iterator';
import { ExtendedIterable } from './extended.iterable';

export * from './no-element.error';
export * from './extended.iterable';

export function toExtendedIterable<T>(data: T[]): ExtendedIterable<T>;
export function toExtendedIterable<T>(data: Iterable<T>): ExtendedIterable<T>;
export function toExtendedIterable<T>(
    data: Iterable<T> | T[],
): ExtendedIterable<T> {
    return new DefaultExtendedIterable(
        () => new DefaultIterator(data[Symbol.iterator]()),
    );
}
