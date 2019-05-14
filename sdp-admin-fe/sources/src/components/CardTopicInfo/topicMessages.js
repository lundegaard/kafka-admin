import { defineMessages } from 'react-intl';

export default defineMessages({
  cleanupPolicy: {
    id: 'topic.cleanup.policy',
    defaultMessage: 'A string that is either "delete" or "compact". This string designates the retention policy to use on old log segments. The default policy ("delete") will discard old segments when their retention time or size limit has been reached. The "compact" setting will enable log compaction on the topic.',
  },
  compressionType: {
    id: 'topic.compression.type',
    defaultMessage: 'Specify the final compression type for a given topic. This configuration accepts the standard compression codecs (\'gzip\', \'snappy\', lz4). It additionally accepts \'uncompressed\' which is equivalent to no compression; and \'producer\' which means retain the original compression codec set by the producer.',
  },
  deleteRetentionMs: {
    id: 'topic.delete.retention.ms',
    defaultMessage: 'The amount of time to retain delete tombstone markers for log compacted topics. This setting also gives a bound on the time in which a consumer must complete a read if they begin from offset 0 to ensure that they get a valid snapshot of the final stage (otherwise delete tombstones may be collected before they complete their scan).',
  },
  fileDeleteDelayMs: {
    id: 'topic.file.delete.delay.ms',
    defaultMessage: 'The time to wait before deleting a file from the filesystem',
  },
  flushMessages: {
    id: 'topic.flush.messages',
    defaultMessage: 'This setting allows specifying an interval at which we will force an fsync of data written to the log. For example if this was set to 1 we would fsync after every message; if it were 5 we would fsync after every five messages. In general we recommend you not set this and use replication for durability and allow the operating system\'s background flush capabilities as it is more efficient. This setting can be overridden on a per-topic basis (see the per-topic configuration section).',
  },
  flushMs: {
    id: 'topic.flush.ms',
    defaultMessage: 'This setting allows specifying a time interval at which we will force an fsync of data written to the log. For example if this was set to 1000 we would fsync after 1000 ms had passed. In general we recommend you not set this and use replication for durability and allow the operating system\'s background flush capabilities as it is more efficient.',
  },
  followerReplicationThrottledReplicas: {
    id: 'topic.follower.replication.throttled.replicas',
    defaultMessage: 'A list of replicas for which log replication should be throttled on the follower side. The list should describe a set of replicas in the form [PartitionId]:[BrokerId],[PartitionId]:[BrokerId]:... or alternatively the wildcard \'*\' can be used to throttle all replicas for this topic.',
  },
  indexIntervalBytes: {
    id: 'topic.index.interval.bytes',
    defaultMessage: 'This setting controls how frequently Kafka adds an index entry to it\'s offset index. The default setting ensures that we index a message roughly every 4096 bytes. More indexing allows reads to jump closer to the exact position in the log but makes the index larger. You probably don\'t need to change this.',
  },
  leaderReplicationThrottledReplicas: {
    id: 'topic.leader.replication.throttled.replicas',
    defaultMessage: 'A list of replicas for which log replication should be throttled on the leader side. The list should describe a set of replicas in the form [PartitionId]:[BrokerId],[PartitionId]:[BrokerId]:... or alternatively the wildcard \'*\' can be used to throttle all replicas for this topic.',
  },
  maxMessageBytes: {
    id: 'topic.max.message.bytes',
    defaultMessage: 'The largest record batch size allowed by Kafka. If this is increased and there are consumers older than 0.10.2, the consumers\' fetch size must also be increased so that the they can fetch record batches this large.In the latest message format version, records are always grouped into batches for efficiency. In previous message format versions, uncompressed records are not grouped into batches and this limit only applies to a single record in that case.',
  },
  messageFormatVersion: {
    id: 'topic.message.format.version',
    defaultMessage: 'Specify the message format version the broker will use to append messages to the logs. The value should be a valid ApiVersion. Some examples are: 0.8.2, 0.9.0.0, 0.10.0, check ApiVersion for more details. By setting a particular message format version, the user is certifying that all the existing messages on disk are smaller or equal than the specified version. Setting this value incorrectly will cause consumers with older versions to break as they will receive messages with a format that they don\'t understand.',
  },
  messageTimestampDifferenceMaxMs: {
    id: 'topic.message.timestamp.difference.max.ms',
    defaultMessage: 'The maximum difference allowed between the timestamp when a broker receives a message and the timestamp specified in the message. If message.timestamp.type=CreateTime, a message will be rejected if the difference in timestamp exceeds this threshold. This configuration is ignored if message.timestamp.type=LogAppendTime.',
  },
  messageTimestampType: {
    id: 'topic.message.timestamp.type',
    defaultMessage: 'Define whether the timestamp in the message is message create time or log append time. The value should be either `CreateTime` or `LogAppendTime`',
  },
  minCleanableDirtyRatio: {
    id: 'topic.min.cleanable.dirty.ratio',
    defaultMessage: 'This configuration controls how frequently the log compactor will attempt to clean the log (assuming log compaction is enabled). By default we will avoid cleaning a log where more than 50% of the log has been compacted. This ratio bounds the maximum space wasted in the log by duplicates (at 50% at most 50% of the log could be duplicates). A higher ratio will mean fewer, more efficient cleanings but will mean more wasted space in the log.',
  },
  minCompactionLagMs: {
    id: 'topic.min.compaction.lag.ms',
    defaultMessage: 'The minimum time a message will remain uncompacted in the log. Only applicable for logs that are being compacted.',
  },
  minInsyncReplicas: {
    id: 'topic.min.insync.replicas',
    defaultMessage: 'When a producer sets acks to "all" (or "-1"), this configuration specifies the minimum number of replicas that must acknowledge a write for the write to be considered successful. If this minimum cannot be met, then the producer will raise an exception (either NotEnoughReplicas or NotEnoughReplicasAfterAppend).When used together, min.insync.replicas and acks allow you to enforce greater durability guarantees. A typical scenario would be to create a topic with a replication factor of 3, set min.insync.replicas to 2, and produce with acks of "all". This will ensure that the producer raises an exception if a majority of replicas do not receive a write.',
  },
  preallocate: {
    id: 'topic.preallocate',
    defaultMessage: 'True if we should preallocate the file on disk when creating a new log segment.',
  },
  retentionBytes: {
    id: 'topic.retention.bytes',
    defaultMessage: 'This configuration controls the maximum size a partition (which consists of log segments) can grow to before we will discard old log segments to free up space if we are using the "delete" retention policy. By default there is no size limit only a time limit. Since this limit is enforced at the partition level, multiply it by the number of partitions to compute the topic retention in bytes.',
  },
  retentionMs: {
    id: 'topic.retention.ms',
    defaultMessage: 'This configuration controls the maximum time we will retain a log before we will discard old log segments to free up space if we are using the "delete" retention policy. This represents an SLA on how soon consumers must read their data.',
  },
  segmentBytes: {
    id: 'topic.segment.bytes',
    defaultMessage: 'This configuration controls the segment file size for the log. Retention and cleaning is always done a file at a time so a larger segment size means fewer files but less granular control over retention.',
  },
  segmentIndexBytes: {
    id: 'topic.segment.index.bytes',
    defaultMessage: 'This configuration controls the size of the index that maps offsets to file positions. We preallocate this index file and shrink it only after log rolls. You generally should not need to change this setting.',
  },
  segmentJitterMs: {
    id: 'topic.segment.jitter.ms',
    defaultMessage: 'The maximum random jitter subtracted from the scheduled segment roll time to avoid thundering herds of segment rolling',
  },
  segmentMs: {
    id: 'topic.segment.ms',
    defaultMessage: 'This configuration controls the period of time after which Kafka will force the log to roll even if the segment file isn\'t full to ensure that retention can delete or compact old data.',
  },
  uncleanLeaderElectionEnable: {
    id: 'topic.unclean.leader.election.enable',
    defaultMessage: 'Indicates whether to enable replicas not in the ISR set to be elected as leader as a last resort, even though doing so may result in data loss.',
  },
});
