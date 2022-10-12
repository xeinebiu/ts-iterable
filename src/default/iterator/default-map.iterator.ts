import {DefaultIterator} from "./default.iterator";

export class DefaultMapIterator<T, K> extends DefaultIterator<K> {
    constructor(
        iterator: Iterator<T>,
        mapper: (element: T) => K
    ) {
        super({
            next: () => {
                const result = iterator.next();
                if (result.done) {
                    return result;
                }

                return {
                    done: false,
                    value: mapper(result.value)
                }
            }
        });
    }
}