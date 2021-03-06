import EmptyPartition from '../internal/EmptyPartition';
import { argumentOutOfRange } from '../internal/errors';
import RepeatPartition from '../internal/RepeatPartition';

export default function repeat<TSource>(element: TSource, count: number = Infinity): Iterable<TSource> {
    if (count < 0) {
        throw argumentOutOfRange('count');
    }

    if (count == 0) {
        return new EmptyPartition<TSource>();
    }

    return new RepeatPartition(element, count);
}
