import EmptyPartition from './EmptyPartition';
import OrderedEnumerable from './OrderedEnumerable';
import Partition from './Partition';
import { noElements } from './errors';

export default class OrderedPartition<TElement> extends Partition<TElement> {
    constructor(private _source: OrderedEnumerable<TElement, any>,
                private _minIndex: number,
                private _maxIndex: number) {
        super();
    }

    [Symbol.iterator](): Iterator<TElement> {
        return this._source.toArrayInPartition(this._minIndex, this._maxIndex)[Symbol.iterator]();
    }

    skip(count: number): Partition<TElement> {
        const minIndex = this._minIndex + count;
        return minIndex > this._maxIndex
            ? new EmptyPartition<TElement>()
            : new OrderedPartition(this._source, minIndex, this._maxIndex);
    }

    take(count: number): Partition<TElement> {
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
    firstOrDefault(defaultValue: TElement): TElement;
    firstOrDefault(defaultValue: TElement | null = null): TElement | null {
        return this._source.elementAtOrDefault(this._minIndex, defaultValue as TElement);
    }

    last(): TElement {
        return this._source.lastInPartition(this._minIndex, this._maxIndex);
    }

    lastOrDefault(): TElement | null;
    lastOrDefault(defaultValue: TElement): TElement;
    lastOrDefault(defaultValue: TElement | null = null): TElement | null {
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
