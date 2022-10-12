import { ExtendedIterable } from '../extended.iterable';
import { NoElementError } from '../no-element.error';
import {
    DefaultIterator,
    DefaultMapIterator,
    DefaultMapNotNullIterator,
    DefaultSkipIterator,
    DefaultTakeIterator,
    DefaultWhereIterator,
} from './iterator';
import { iterableToList } from './util';

export class DefaultExtendedIterable<T> implements ExtendedIterable<T> {
    constructor(private readonly iterator: () => DefaultIterator<T>) {}

    [Symbol.iterator](): Iterator<T> {
        return this.iterator();
    }

    public all(predicate: (element: T) => boolean): boolean {
        for (const element of this) {
            if (!predicate(element)) return false;
        }
        return true;
    }

    public any(predicate: (element: T) => boolean): boolean {
        for (const element of this) {
            if (predicate(element)) return true;
        }
        return false;
    }

    public first(): T {
        for (const element of this) {
            return element;
        }
        throw new NoElementError();
    }

    public firstOrNull(): T | null {
        for (const element of this) {
            return element;
        }
        return null;
    }

    public map<K>(mapper: (element: T) => K): ExtendedIterable<K> {
        const iterator = () => new DefaultMapIterator(this.iterator(), mapper);
        return new DefaultExtendedIterable(iterator);
    }

    public mapNotNull<K>(
        mapper: (element: T) => K | undefined | null,
    ): ExtendedIterable<K> {
        const iterator = () =>
            new DefaultMapNotNullIterator(this.iterator(), mapper);
        return new DefaultExtendedIterable(iterator);
    }

    public none(predicate: (element: T) => boolean): boolean {
        for (const element of this) {
            if (predicate(element)) return false;
        }
        return true;
    }

    public skip(skip: number): ExtendedIterable<T> {
        const iterator = () => new DefaultSkipIterator(this.iterator(), skip);
        return new DefaultExtendedIterable(iterator);
    }

    public take(take: number): ExtendedIterable<T> {
        const iterator = () => new DefaultTakeIterator(this.iterator(), take);
        return new DefaultExtendedIterable(iterator);
    }

    public where(predicate: (element: T) => boolean): ExtendedIterable<T> {
        const iterator = () =>
            new DefaultWhereIterator(this.iterator(), predicate);
        return new DefaultExtendedIterable(iterator);
    }

    public whereNotNull(): ExtendedIterable<NonNullable<T>> {
        const iterator = () =>
            new DefaultMapNotNullIterator(this.iterator(), x => {
                if (x) return x;
                return null;
            });

        return new DefaultExtendedIterable(iterator);
    }

    public sorted(sorter: (a: T, b: T) => number): ExtendedIterable<T> {
        const list = iterableToList(this);
        list.sort(sorter);

        return new DefaultExtendedIterable(
            () => new DefaultIterator<T>(list[Symbol.iterator]()),
        );
    }

    public grouped<K>(group: (a: T) => K): ExtendedIterable<[K, T[]]> {
        const list = iterableToList(this);

        const map = new Map<K, T[]>();
        list.forEach(item => {
            const key = group(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });

        return new DefaultExtendedIterable(
            () => new DefaultIterator(map[Symbol.iterator]()),
        );
    }

    public toList(): T[] {
        return iterableToList(this);
    }
}
