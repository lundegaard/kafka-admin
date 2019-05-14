package eu.lundegaard.sdp.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * Builder class which construct from given consumer stream of records.
 */
public class KafkaConsumerStream {
    private static final int DEFAULT_POLL_TIMEOUT = 2000;
    /**
     * Creates from given consumer endless stream with messages.
     * @param consumer which will be polled by created stream
     * @param <K> key type
     * @param <V> value type
     * @return stream of consumer records
     */
    public static <K, V> Stream<ConsumerRecord<K, V>> of(KafkaConsumer<K, V> consumer) {
        ConsumerIterator<K, V> iterator = new ConsumerIterator<>(consumer, Long.MAX_VALUE, DEFAULT_POLL_TIMEOUT);
        return StreamSupport.stream(Spliterators.spliteratorUnknownSize(iterator, Spliterator.ORDERED), false);
    }

    /**
     * Creates from given consumer stream which provides records until it reaches end.
     * @param consumer which will be polled by created stream
     * @param <K> key type
     * @param <V> value type
     * @return stream of consumer records
     */
    public static <K, V> Stream<ConsumerRecord<K, V>> untilLatest(KafkaConsumer<K, V> consumer) {
        return untilLatest(consumer, DEFAULT_POLL_TIMEOUT);
    }

    /**
     * Creates from given consumer stream which provides records until it reaches end.
     * @param consumer which will be polled by created stream
     * @param pollTimeout polling timeout
     * @param <K> key type
     * @param <V> value type
     * @return stream of consumer records
     */
    public static <K, V> Stream<ConsumerRecord<K, V>> untilLatest(KafkaConsumer<K, V> consumer, int pollTimeout) {
        ConsumerIterator<K, V> iterator = new ConsumerIterator<>(consumer, 1, pollTimeout);
        return StreamSupport.stream(Spliterators.spliteratorUnknownSize(iterator, Spliterator.ORDERED), false);
    }

    /**
     * Iterator implementation which is polling records from #KafkaConsumer.
     * @param <K> key type
     * @param <V> value type
     */
    private static class ConsumerIterator<K, V> implements Iterator<ConsumerRecord<K, V>> {
        private final KafkaConsumer<K, V> consumer;
        private final long retries;
        private final Duration timeout;
        private Queue<ConsumerRecord<K, V>> queue;

        public ConsumerIterator(KafkaConsumer<K, V> consumer, long retries, int pollTimeout) {
            this.consumer = consumer;
            this.retries = retries;
            this.timeout = Duration.ofMillis(pollTimeout);
            this.queue = new LinkedList<>();
        }

        @Override
        public boolean hasNext() {
            if(queue.isEmpty()) {
                long attempts = 0;
                while (attempts < retries && queue.isEmpty()) {
                    this.queue = pollRecords();
                    attempts++;
                }
                return !queue.isEmpty();
            } else {
                return true;
            }
        }

        @Override
        public ConsumerRecord<K, V> next() {
            return queue.remove();
        }

        private Queue<ConsumerRecord<K, V>> pollRecords() {
            ConsumerRecords<K, V> records = consumer.poll(timeout);
            return StreamSupport.stream(records.spliterator(), false).collect(Collectors.toCollection(LinkedList::new));
        }
    }
}
