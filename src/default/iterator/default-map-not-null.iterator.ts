import {DefaultIterator} from "./default.iterator";

export class DefaultMapNotNullIterator<T, K> extends DefaultIterator<K> {
    constructor(
        iterator: Iterator<T>,
        mapper: (element: T) => (K | null | undefined)
    ) {
        super({
            next: () => {
                let current = iterator.next();

                while (current && !current.done) {
                    if (current.value !== null && current.value !== undefined) {
                        let mappedValue = mapper(current.value);
                        if (mappedValue) {
                            return {
                                done: false,
                                value: mappedValue
                            }
                        }
                    }

                    current = iterator.next();
                }

                return {
                    done: true,
                    value: undefined
                }
            }
        });
    }
}