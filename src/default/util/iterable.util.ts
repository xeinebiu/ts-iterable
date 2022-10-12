export function iterableToList<T>(iterable: Iterable<T>): T[] {
    const result: T[] = [];
    for (const element of iterable) {
        result.push(element);
    }
    return result;
}
