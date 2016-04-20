export default function toLookup<TSource, TKey>(keySelector: (element: TSource) => TKey): Map<TKey, TSource[]>;
export default function toLookup<TSource, TKey, TElement>(keySelector: (element: TSource) => TKey, elementSelector?: (element: TSource) => TElement): Map<TKey, TElement[]> {
    if (elementSelector == null) elementSelector = x => x as any;

    const lookup = new Map<TKey, TElement[]>();

    for (const element of this as Iterable<TSource>) {
        const key = keySelector(element);
        const value = elementSelector(element);
        if (lookup.has(key)) {
            lookup.get(key).push(value);
        } else {
            lookup.set(key, [value]);
        }
    }

    return lookup;
}