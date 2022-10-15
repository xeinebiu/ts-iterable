export interface ExtendedIterable<T> extends Iterable<T> {
    /**
     * Return `true` if all elements match the [predicate]
     */
    every(predicate: (element: T) => boolean): boolean;

    /**
     * Return `true` if any of the elements match the [predicate]
     */
    some(predicate: (element: T) => boolean): boolean;

    /**
     * Return the first element if available, otherwise throw [NoElementError]
     */
    first(): T;

    /**
     * Return the first element if available, otherwise null
     */
    firstOrNull(): T | null;

    /**
     * Map the elements using the [mapper]
     */
    map<K>(mapper: (element: T) => K): ExtendedIterable<K>;

    /**
     * Map the elements using the [mapper] and avoid inserting `null|undefined` values in the list
     */
    mapNotNull<K>(
        mapper: (element: T) => K | undefined | null,
    ): ExtendedIterable<K>;

    /**
     * Return `true` if all the elements do not match the predicate
     */
    none(predicate: (element: T) => boolean): boolean;

    /**
     * Offset the elements cursor starting from index 0
     */
    skip(skip: number): ExtendedIterable<T>;

    /**
     * Take specific amount of elements
     */
    take(take: number): ExtendedIterable<T>;

    /**
     * Filter the elements which match the [predicate]
     */
    filter(predicate: (element: T) => boolean): ExtendedIterable<T>;

    /**
     * Filter `undefined|null` values out
     */
    filterNotNull(): ExtendedIterable<NonNullable<T>>;

    /**
     * Sort all elements and return new [ExtendedIterable]
     */
    sort(sorter: (a: T, b: T) => number): ExtendedIterable<T>;

    /**
     * Group all elements and return new [ExtendedIterable]
     */
    group<K>(group: (a: T) => K): ExtendedIterable<[K, T[]]>;

    /**
     * Convert the [IEnumerable] to [Array]
     */
    toList(): T[];
}
