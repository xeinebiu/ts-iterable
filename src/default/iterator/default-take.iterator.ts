import {DefaultIterator} from "./default.iterator";

export class DefaultTakeIterator<T> extends DefaultIterator<T> {

    private taken = 0;

    constructor(
        iterator: Iterator<T>,
        private readonly take: number,
    ) {
        super(iterator);
    }

    public next(): IteratorResult<T> {
        if (this.taken >= this.take) {
            return {
                done: true,
                value: undefined
            }
        }

        this.taken++;
        return super.next();
    }
}