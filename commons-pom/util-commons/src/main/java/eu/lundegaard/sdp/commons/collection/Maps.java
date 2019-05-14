package eu.lundegaard.sdp.commons.collection;

import java.util.HashMap;
import java.util.Map;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Maps {
    private Maps() {
    }

    /**
     * Merge map left and right using given combiner for merging map values with same key.
     * @param left
     * @param right
     * @param combiner
     * @return merged map
     */
    public static <K, V> Map<K, V> merge(Map<K, V> left, Map<K, V> right, BinaryOperator<V> combiner) {
        Map<K, V> merge = new HashMap<>(left);
        right.forEach((k, v) -> merge.merge(k, v, combiner::apply));
        return merge;
    }

    /**
     * Transform map's values using given function.
     * @param input
     * @param function
     * @return
     */
    public static <X, Y, Z> Map<X, Z> mapValue(Map<X, Y> input, Function<Y, Z> function) {
        return input
                .entrySet()
                .stream()
                .collect(
                        Collectors.toMap(Map.Entry::getKey,
                                (entry) -> function.apply(entry.getValue())));
    }
}
