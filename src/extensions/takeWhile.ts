import takeWhileFn from '../takeWhile';
import { Enumerable } from '../internal/Enumerable';

function takeWhile<TSource>(this: Enumerable<TSource>, predicate: (element: TSource) => boolean): Enumerable<TSource> {
    return new Enumerable<TSource>(takeWhileFn.call(this.source, predicate));
}

Enumerable.prototype.takeWhile = takeWhile;

declare module '../internal/Enumerable' {
    interface Enumerable<TSource> {
        takeWhile(predicate: (element: TSource) => boolean): Enumerable<TSource>;
    }
}
