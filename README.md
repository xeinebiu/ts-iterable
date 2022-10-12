## Iterable for Typescript

Similar to what we know from ``C#``, `Dart` or any other language which supports them,
we use Iterables to stream over collections.

## Why using the Iterable?

Iterables are useful when you want to chain several operations on a collection such as

- where
- map
- mapNotNull
- take
- skip
- etc ...

For example, lets consider a case. We need to work with a collection to filter the numbers greater than ``20``, map to
the string only the 3'rd value.

- Without the Iterable

````typescript
const data = [1, 10, 20, 30, 40, 50, ...];
const filteredData = data.filter(x => x > 20);
const value = filteredData[3];
const mappedValue = value.toString();

// result "50"
````

- Using the Iterable

````typescript
const data = [1, 10, 20, 30, 40, 50, ...];
const mappedValue = toExtendedIterable(data)
    .where(x => x > 20)
    .skip(2)
    .map(x => x.toString())
    .first()

// result "50"
````

The Iterable code would be similar as 
````typescript
let skipped = 0;
for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element > 20 && ++skipped < 2) return element.toString();
}
throw new NoElementError();
````

Not only the difference stays that we have written it differently, but also how much data was processed.

On the example without using the ``Iterable``

- All elements of the collection are visited and filtered
- The third element is retrieved
- The retrieved element is mapped to a string

Now, if the collection is really huge, this will take time to process.

While, using the ``Iterable``, that is not necessarily as we know we do not need all the elements.
Because we call ``first()`` at the end, that means that the operation will stop as soon this condition is meet.

- Find from collection only the first value that is greater than `20`
- Map the value to a string

## Installation

````shell
npm i @xeinebiu/ts-iterable
````

## Examples

### Convert a list to iterable

````typescript
const data = [1, 2, 3, 4, 5];
const iterable = toExtendedIterable(data);
````

### Where

````typescript
// without the Iterable
const filtered = data.filter(x => x < 4);

// with iterable
const filtered = toExtendedIterable(data)
    .where(x => x < 4)
    .toList();

// result [1, 2, 3]
````

### Where Not Null

Filter `undefined|null` values out

````typescript
const data = [1, 2, null, 3, undefiend, 4];
const filtered = toExtendedIterable(data)
    .whereNotNull();

// result [1, 2, 3, 4]
````

### Take

Take specific amount of elements

````typescript
// without iterable
const taken = data.slice(0, 3);

// with iterable
const taken = toExtendedIterable(data)
    .take(3)
    .toList();

// result [1, 2, 3]
````

### All

Return `true` if all elements match the predicate.

````typescript
const result = toExtendedIterable(data)
    .all(x => x.toString() !== "hello world");

// result true
````

### Any

Return `true` if any of the elements match the predicate

````typescript
const result = toExtendedIterable(data)
    .any(x => x.toString() !== "1");

// result true
````

### None

Return `true` if all the elements do not match the predicate

````typescript
const result = toExtendedIterable(data)
    .none(x => x <= -1);

// result true
````

### First

Return the first element if available, otherwise throw ``NoElementError``

````typescript
const result = toExtendedIterable(data)
    .where(x => x > 4)
    .first();

// result 5
````

### First Or Null

Return the first element if available, otherwise null.

````typescript
const result = toExtendedIterable(data)
    .where(x => x > 100)
    .firstOrNull();

// result null
````

### Map

Map the elements using a mapper

````typescript
const result = toExtendedIterable(data)
    .where(x => x < 3)
    .map(x => x.toString())
    .toList();

// result ["1", "2"]
````

### Map Not Null

Map the elements using the mapper and avoid inserting `null|undefined` values in the list

````typescript
const data = [1, null, 2, undefined, 3];

const result = toExtendedIterable(data)
    .where(x => x < 3)
    .mapNotNull(x => x?.toString())
    .toList();

// result ["1", "2", "3"]
````

### Skip

Offset the elements cursor starting from index 0

````typescript
const result = toExtendedIterable(data)
    .skip(1)
    .toList();

// result ["2", "3", "4", "5"]
````

### Take

Take specific amount of elements

````typescript
const result = toExtendedIterable(data)
    .take(2)
    .toList();

// result ["1", "2"]
````

### Sorted

Sort all elements and return new [ExtendedIterable]

````typescript
const sorted = toExtendedIterable(data)
    .sorted((a, b) => b - a)
    .toList();

// result [5, 4, 3, 2, 1]
````

### Grouped

Group all elements and return new [ExtendedIterable]

````typescript
const data = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const groupedData = toExtendedIterable(data)
    .grouped(x => {
        if (x < 0) return "negative";
        return "positive";
    })
    .toList();

// result
// [
//     ["negative", [-9, -8, -7, -6, -5, -4, -3, -2, -1]],
//     ["positive", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]
// ];
````

### To List

Convert the Iterable to a collection.

````typescript
const list = toExtendedIterable(data)
    .toList();

// result [1, 2, 3, 4, 5]
````

## MIT
### The MIT License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
