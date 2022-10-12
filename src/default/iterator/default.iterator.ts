export class DefaultIterator<T> implements Iterator<T> {
    constructor(private readonly iterator: Iterator<T>) {}

    public next(): IteratorResult<T> {
        return this.iterator.next();
    }
}
