import EmptyPartition from './EmptyPartition';
import OrderedEnumerable from './OrderedEnumerable';
import { IPartition, partitionSymbol } from './partition';
import { noElements } from './errors';

export default class OrderedPartition<TElement> implements IPartition<TElement> {
    constructor(private readonly _source: OrderedEnumerable<TElement, any>,
                private readonly _minIndex: number,
                private readonly _maxIndex: number) {
    }

    [Symbol.iterator](): Iterator<TElement> {
        return this._source.toArrayInPartition(this._minIndex, this._maxIndex)[Symbol.iterator]();
    }

    [partitionSymbol](): boolean {
        return true;
    }

    skip(count: number): IPartition<TElement> {
        const minIndex = this._minIndex + count;
        return minIndex > this._maxIndex
            ? new EmptyPartition<TElement>()
            : new OrderedPartition(this._source, minIndex, this._maxIndex);
    }

    take(count: number): IPartition<TElement> {
        let maxIndex = this._minIndex + count - 1;
        if (maxIndex > this._maxIndex) {
            maxIndex = this._maxIndex;
        }
        return new OrderedPartition(this._source, this._minIndex, maxIndex);
    }

    first(): TElement {
        return this._source.elementAt(this._minIndex);
    }

    firstOrDefault(): TElement | null;
    firstOrDefault(predicate: null, defaultValue: TElement): TElement;
    firstOrDefault(predicate?: null, defaultValue: TElement | null = null): TElement | null {
        return this._source.elementAtOrDefault(this._minIndex, defaultValue as TElement);
    }

    last(): TElement {
        return this._source.lastInPartition(this._minIndex, this._maxIndex);
    }

    lastOrDefault(): TElement | null;
    lastOrDefault(predicate: null, defaultValue: TElement): TElement;
    lastOrDefault(predicate?: null, defaultValue: TElement | null = null): TElement | null {
        return this._source.lastOrDefaultInPartition(this._minIndex, this._maxIndex, defaultValue);
    }

    elementAt(index: number): TElement {
        if (index > this._maxIndex - this._minIndex) {
            throw noElements();
        }
        return this._source.elementAt(index + this._minIndex);
    }

    elementAtOrDefault(index: number): TElement | null;
    elementAtOrDefault(index: number, defaultValue: TElement): TElement;
    elementAtOrDefault(index: number, defaultValue: TElement | null = null): TElement | null {
        if (index > this._maxIndex - this._minIndex) {
            return defaultValue;
        }
        return this._source.elementAtOrDefault(index + this._minIndex, defaultValue as TElement);
    }
}
