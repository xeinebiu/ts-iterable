import {DefaultIterator} from "./default.iterator";

export class DefaultSkipIterator<T> extends DefaultIterator<T> {
    private skipped = false;

    constructor(
        iterator: Iterator<T>,
        private readonly skip: number,
    ) {
        super(iterator);
    }

    public next(): IteratorResult<T> {
        this._skip();

        return super.next();
    }

    private _skip() {
        if (!this.skipped) {
            this.skipped = true;

            for (let i = 0; i < this.skip; i++) {
                super.next();
            }
        }
    }
}