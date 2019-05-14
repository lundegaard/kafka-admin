package eu.lundegaard.sdp.commons.collection;

import java.lang.reflect.Array;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

public class Arrays {
    private Arrays() {
    }

    /**
     * @param input
     * @param function mapping function for transforming input instances into target array
     * @param type     for helping construct new array
     * @return array of instances transformed by given function
     */
    public static <X, Y> Y[] map(X[] input, Function<X, Y> function, Class<Y> type) {
        Y[] target = (Y[]) Array.newInstance(type, input.length);
        for (int i = 0; i < input.length; i++) {
            target[i] = function.apply(input[i]);
        }
        return target;

    }

    /**
     * @param input
     * @param consumer which consumes given input array
     */
    public static <X> void forEach(X[] input, Consumer<X> consumer) {
        for (int i = 0; i < input.length; i++) {
            consumer.accept(input[i]);
        }
    }

    @SafeVarargs
    /**
     * @see java.util.Arrays
     */
    public static <T> List<T> asList(T... items) {
        return java.util.Arrays.asList(items);
    }


}
