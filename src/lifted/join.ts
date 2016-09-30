import { Enumerable } from '../Enumerable';
import joinFn from '../join';

export default function join<TOuter, TInner, TKey, TResult>(this: Enumerable<TOuter>, inner: Iterable<TInner>, outerKeySelector: (element: TOuter) => TKey, innerKeySelector: (element: TInner) => TKey, resultSelector: (outer: TOuter, inner: TInner) => TResult): Enumerable<TResult> {
    return this.lift<TResult>(joinFn.call(this, inner, outerKeySelector, innerKeySelector, resultSelector));
}
