import {DefaultIterator} from "./default.iterator";

export class DefaultWhereIterator<T> extends DefaultIterator<T> {
    constructor(
        iterator: Iterator<T>,
        private readonly predicate: (element: T) => boolean
    ) {
        super(iterator);
    }

    public next(): IteratorResult<T> {
        let result = super.next();
        while (result && !result.done) {
            if (this.predicate(result.value)) {
                return result;
            }

            result = super.next();
        }

        return {
            done: true,
            value: undefined
        };
    }
}