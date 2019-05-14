import { defineMessages } from 'react-intl';

export default defineMessages({
  zookeeperConnect: {
    id: 'broker.zookeeper.connect',
    defaultMessage: 'Zookeeper host string',
  },
  advertisedHostName: {
    id: 'broker.advertised.host.name',
    defaultMessage: 'DEPRECATED: only used when `advertised.listeners` or `listeners` are not set. Use `advertised.listeners` instead. Hostname to publish to ZooKeeper for clients to use. In IaaS environments, this may need to be different from the interface to which the broker binds. If this is not set, it will use the value for `host.name` if configured. Otherwise it will use the value returned from java.net.InetAddress.getCanonicalHostName().',
  },
  advertisedListeners: {
    id: 'broker.advertised.listeners',
    defaultMessage: 'Listeners to publish to ZooKeeper for clients to use, if different than the `listeners` config property. In IaaS environments, this may need to be different from the interface to which the broker binds. If this is not set, the value for `listeners` will be used. Unlike `listeners` it is not valid to advertise the 0.0.0.0 meta-address.',
  },
  advertisedPort: {
    id: 'broker.advertised.port',
    defaultMessage: 'DEPRECATED: only used when `advertised.listeners` or `listeners` are not set. Use `advertised.listeners` instead. The port to publish to ZooKeeper for clients to use. In IaaS environments, this may need to be different from the port to which the broker binds. If this is not set, it will publish the same port that the broker binds to.',
  },
  autoCreateTopicsEnable: {
    id: 'broker.auto.create.topics.enable',
    defaultMessage: 'Enable auto creation of topic on the server',
  },
  autoLeaderRebalanceEnable: {
    id: 'broker.auto.leader.rebalance.enable',
    defaultMessage: 'Enables auto leader balancing. A background thread checks and triggers leader balance if required at regular intervals',
  },
  backgroundThreads: {
    id: 'broker.background.threads',
    defaultMessage: 'The number of threads to use for various background processing tasks',
  },
  brokerId: {
    id: 'broker.broker.id',
    defaultMessage: 'The broker id for this server. If unset, a unique broker id will be generated.To avoid conflicts between zookeeper generated broker id\'s and user configured broker id\'s, generated broker ids start from reserved.broker.max.id + 1.',
  },
  compressionType: {
    id: 'broker.compression.type',
    defaultMessage: 'Specify the final compression type for a given topic. This configuration accepts the standard compression codecs (\'gzip\', \'snappy\', \'lz4\'). It additionally accepts \'uncompressed\' which is equivalent to no compression; and \'producer\' which means retain the original compression codec set by the producer.',
  },
  deleteTopicEnable: {
    id: 'broker.delete.topic.enable',
    defaultMessage: 'Enables delete topic. Delete topic through the admin tool will have no effect if this config is turned off',
  },
  hostName: {
    id: 'broker.host.name',
    defaultMessage: 'DEPRECATED: only used when `listeners` is not set. Use `listeners` instead. hostname of broker. If this is set, it will only bind to this address. If this is not set, it will bind to all interfaces',
  },
  leaderImbalanceCheckIntervalSeconds: {
    id: 'broker.leader.imbalance.check.interval.seconds',
    defaultMessage: 'The frequency with which the partition rebalance check is triggered by the controller',
  },
  leaderImbalancePerBrokerPercentage: {
    id: 'broker.leader.imbalance.per.broker.percentage',
    defaultMessage: 'The ratio of leader imbalance allowed per broker. The controller would trigger a leader balance if it goes above this value per broker. The value is specified in percentage.',
  },
  listeners: {
    id: 'broker.listeners',
    defaultMessage: 'Listener List - Comma-separated list of URIs we will listen on and the listener names. If the listener name is not a security protocol, listener.security.protocol.map must also be set. Specify hostname as 0.0.0.0 to bind to all interfaces. Leave hostname empty to bind to default interface. Examples of legal listener lists: PLAINTEXT://myhost:9092,SSL://:9091 CLIENT://0.0.0.0:9092,REPLICATION://localhost:9093',
  },
  logDir: {
    id: 'broker.log.dir',
    defaultMessage: 'The directory in which the log data is kept (supplemental for log.dirs property)',
  },
  logDirs: {
    id: 'broker.log.dirs',
    defaultMessage: 'The directories in which the log data is kept. If not set, the value in log.dir is used',
  },
  logFlushIntervalMessages: {
    id: 'broker.log.flush.interval.messages',
    defaultMessage: 'The number of messages accumulated on a log partition before messages are flushed to disk ',
  },
  logFlushIntervalMs: {
    id: 'broker.log.flush.interval.ms',
    defaultMessage: 'The maximum time in ms that a message in any topic is kept in memory before flushed to disk. If not set, the value in log.flush.scheduler.interval.ms is used',
  },
  logFlushOffsetCheckpointIntervalMs: {
    id: 'broker.log.flush.offset.checkpoint.interval.ms',
    defaultMessage: 'The frequency with which we update the persistent record of the last flush which acts as the log recovery point',
  },
  logFlushSchedulerIntervalMs: {
    id: 'broker.log.flush.scheduler.interval.ms',
    defaultMessage: 'The frequency in ms that the log flusher checks whether any log needs to be flushed to disk',
  },
  logFlushStartOffsetCheckpointIntervalMs: {
    id: 'broker.log.flush.start.offset.checkpoint.interval.ms',
    defaultMessage: 'The frequency with which we update the persistent record of log start offset',
  },
  logRetentionBytes: {
    id: 'broker.log.retention.bytes',
    defaultMessage: 'The maximum size of the log before deleting it',
  },
  logRetentionHours: {
    id: 'broker.log.retention.hours',
    defaultMessage: 'The number of hours to keep a log file before deleting it (in hours), tertiary to log.retention.ms property',
  },
  logRetentionMinutes: {
    id: 'broker.log.retention.minutes',
    defaultMessage: 'The number of minutes to keep a log file before deleting it (in minutes), secondary to log.retention.ms property. If not set, the value in log.retention.hours is used',
  },
  logRetentionMs: {
    id: 'broker.log.retention.ms',
    defaultMessage: 'The number of milliseconds to keep a log file before deleting it (in milliseconds), If not set, the value in log.retention.minutes is used',
  },
  logRollHours: {
    id: 'broker.log.roll.hours',
    defaultMessage: 'The maximum time before a new log segment is rolled out (in hours), secondary to log.roll.ms property',
  },
  logRollJitterHours: {
    id: 'broker.log.roll.jitter.hours',
    defaultMessage: 'The maximum jitter to subtract from logRollTimeMillis (in hours), secondary to log.roll.jitter.ms property',
  },
  logRollJitterMs: {
    id: 'broker.log.roll.jitter.ms',
    defaultMessage: 'The maximum jitter to subtract from logRollTimeMillis (in milliseconds). If not set, the value in log.roll.jitter.hours is used',
  },
  logRollMs: {
    id: 'broker.log.roll.ms',
    defaultMessage: 'The maximum time before a new log segment is rolled out (in milliseconds). If not set, the value in log.roll.hours is used',
  },
  logSegmentBytes: {
    id: 'broker.log.segment.bytes',
    defaultMessage: 'The maximum size of a single log file',
  },
  logSegmentDeleteDelayMs: {
    id: 'broker.log.segment.delete.delay.ms',
    defaultMessage: 'The amount of time to wait before deleting a file from the filesystem',
  },
  messageMaxBytes: {
    id: 'broker.message.max.bytes',
    defaultMessage: 'The largest record batch size allowed by Kafka. If this is increased and there are consumers older than 0.10.2, the consumers\' fetch size must also be increased so that the they can fetch record batches this large.In the latest message format version, records are always grouped into batches for efficiency. In previous message format versions, uncompressed records are not grouped into batches and this limit only applies to a single record in that case.This can be set per topic with the topic level max.message.bytes config.',
  },
  minInsyncReplicas: {
    id: 'broker.min.insync.replicas',
    defaultMessage: 'When a producer sets acks to "all" (or "-1"), min.insync.replicas specifies the minimum number of replicas that must acknowledge a write for the write to be considered successful. If this minimum cannot be met, then the producer will raise an exception (either NotEnoughReplicas or NotEnoughReplicasAfterAppend).When used together, min.insync.replicas and acks allow you to enforce greater durability guarantees. A typical scenario would be to create a topic with a replication factor of 3, set min.insync.replicas to 2, and produce with acks of "all". This will ensure that the producer raises an exception if a majority of replicas do not receive a write.',
  },
  numIoThreads: {
    id: 'broker.num.io.threads',
    defaultMessage: 'The number of threads that the server uses for processing requests, which may include disk I/O',
  },
  numNetworkThreads: {
    id: 'broker.num.network.threads',
    defaultMessage: 'The number of threads that the server uses for receiving requests from the network and sending responses to the network',
  },
  numRecoveryThreadsPerDataDir: {
    id: 'broker.num.recovery.threads.per.data.dir',
    defaultMessage: 'The number of threads per data directory to be used for log recovery at startup and flushing at shutdown',
  },
  numReplicaAlterLogDirsThreads: {
    id: 'broker.num.replica.alter.log.dirs.threads',
    defaultMessage: 'The number of threads that can move replicas between log directories, which may include disk I/O',
  },
  numReplicaFetchers: {
    id: 'broker.num.replica.fetchers',
    defaultMessage: 'Number of fetcher threads used to replicate messages from a source broker. Increasing this value can increase the degree of I/O parallelism in the follower broker.',
  },
  offsetMetadataMaxBytes: {
    id: 'broker.offset.metadata.max.bytes',
    defaultMessage: 'The maximum size for a metadata entry associated with an offset commit',
  },
  offsetsCommitRequiredAcks: {
    id: 'broker.offsets.commit.required.acks',
    defaultMessage: 'The required acks before the commit can be accepted. In general, the default (-1) should not be overridden',
  },
  offsetsCommitTimeoutMs: {
    id: 'broker.offsets.commit.timeout.ms',
    defaultMessage: 'Offset commit will be delayed until all replicas for the offsets topic receive the commit or this timeout is reached. This is similar to the producer request timeout.',
  },
  offsetsLoadBufferSize: {
    id: 'broker.offsets.load.buffer.size',
    defaultMessage: 'Batch size for reading from the offsets segments when loading offsets into the cache.',
  },
  offsetsRetentionCheckIntervalMs: {
    id: 'broker.offsets.retention.check.interval.ms',
    defaultMessage: 'Frequency at which to check for stale offsets',
  },
  offsetsRetentionMinutes: {
    id: 'broker.offsets.retention.minutes',
    defaultMessage: 'Offsets older than this retention period will be discarded',
  },
  offsetsTopicCompressionCodec: {
    id: 'broker.offsets.topic.compression.codec',
    defaultMessage: 'Compression codec for the offsets topic - compression may be used to achieve "atomic" commits',
  },
  offsetsTopicNumPartitions: {
    id: 'broker.offsets.topic.num.partitions',
    defaultMessage: 'The number of partitions for the offset commit topic (should not change after deployment)',
  },
  offsetsTopicReplicationFactor: {
    id: 'broker.offsets.topic.replication.factor',
    defaultMessage: 'The replication factor for the offsets topic (set higher to ensure availability). Internal topic creation will fail until the cluster size meets this replication factor requirement.',
  },
  offsetsTopicSegmentBytes: {
    id: 'broker.offsets.topic.segment.bytes',
    defaultMessage: 'The offsets topic segment bytes should be kept relatively small in order to facilitate faster log compaction and cache loads',
  },
  port: {
    id: 'broker.port',
    defaultMessage: 'DEPRECATED: only used when `listeners` is not set. Use `listeners` instead. the port to listen and accept connections on',
  },
  queuedMaxRequests: {
    id: 'broker.queued.max.requests',
    defaultMessage: 'The number of queued requests allowed before blocking the network threads',
  },
  quotaConsumerDefault: {
    id: 'broker.quota.consumer.default',
    defaultMessage: 'DEPRECATED: Used only when dynamic default quotas are not configured for  or  in Zookeeper. Any consumer distinguished by clientId/consumer group will get throttled if it fetches more bytes than this value per-second',
  },
  quotaProducerDefault: {
    id: 'broker.quota.producer.default',
    defaultMessage: 'DEPRECATED: Used only when dynamic default quotas are not configured for ,  or  in Zookeeper. Any producer distinguished by clientId will get throttled if it produces more bytes than this value per-second',
  },
  replicaFetchMinBytes: {
    id: 'broker.replica.fetch.min.bytes',
    defaultMessage: 'Minimum bytes expected for each fetch response. If not enough bytes, wait up to replicaMaxWaitTimeMs',
  },
  replicaFetchWaitMaxMs: {
    id: 'broker.replica.fetch.wait.max.ms',
    defaultMessage: 'max wait time for each fetcher request issued by follower replicas. This value should always be less than the replica.lag.time.max.ms at all times to prevent frequent shrinking of ISR for low throughput topics',
  },
  replicaHighWatermarkCheckpointIntervalMs: {
    id: 'broker.replica.high.watermark.checkpoint.interval.ms',
    defaultMessage: 'The frequency with which the high watermark is saved out to disk',
  },
  replicaLagTimeMaxMs: {
    id: 'broker.replica.lag.time.max.ms',
    defaultMessage: 'If a follower hasn\'t sent any fetch requests or hasn\'t consumed up to the leaders log end offset for at least this time, the leader will remove the follower from isr',
  },
  replicaSocketReceiveBufferBytes: {
    id: 'broker.replica.socket.receive.buffer.bytes',
    defaultMessage: 'The socket receive buffer for network requests',
  },
  replicaSocketTimeoutMs: {
    id: 'broker.replica.socket.timeout.ms',
    defaultMessage: 'The socket timeout for network requests. Its value should be at least replica.fetch.wait.max.ms',
  },
  requestTimeoutMs: {
    id: 'broker.request.timeout.ms',
    defaultMessage: 'The configuration controls the maximum amount of time the client will wait for the response of a request. If the response is not received before the timeout elapses the client will resend the request if necessary or fail the request if retries are exhausted.',
  },
  socketReceiveBufferBytes: {
    id: 'broker.socket.receive.buffer.bytes',
    defaultMessage: 'The SO_RCVBUF buffer of the socket sever sockets. If the value is -1, the OS default will be used.',
  },
  socketRequestMaxBytes: {
    id: 'broker.socket.request.max.bytes',
    defaultMessage: 'The maximum number of bytes in a socket request',
  },
  socketSendBufferBytes: {
    id: 'broker.socket.send.buffer.bytes',
    defaultMessage: 'The SO_SNDBUF buffer of the socket sever sockets. If the value is -1, the OS default will be used.',
  },
  transactionMaxTimeoutMs: {
    id: 'broker.transaction.max.timeout.ms',
    defaultMessage: 'The maximum allowed timeout for transactions. If a client’s requested transaction time exceed this, then the broker will return an error in InitProducerIdRequest. This prevents a client from too large of a timeout, which can stall consumers reading from topics included in the transaction.',
  },
  transactionStateLogLoadBufferSize: {
    id: 'broker.transaction.state.log.load.buffer.size',
    defaultMessage: 'Batch size for reading from the transaction log segments when loading producer ids and transactions into the cache.',
  },
  transactionStateLogMinIsr: {
    id: 'broker.transaction.state.log.min.isr',
    defaultMessage: 'Overridden min.insync.replicas config for the transaction topic.',
  },
  transactionStateLogNumPartitions: {
    id: 'broker.transaction.state.log.num.partitions',
    defaultMessage: 'The number of partitions for the transaction topic (should not change after deployment).',
  },
  transactionStateLogReplicationFactor: {
    id: 'broker.transaction.state.log.replication.factor',
    defaultMessage: 'The replication factor for the transaction topic (set higher to ensure availability). Internal topic creation will fail until the cluster size meets this replication factor requirement.',
  },
  transactionStateLogSegmentBytes: {
    id: 'broker.transaction.state.log.segment.bytes',
    defaultMessage: 'The transaction topic segment bytes should be kept relatively small in order to facilitate faster log compaction and cache loads',
  },
  transactionalIdExpirationMs: {
    id: 'broker.transactional.id.expiration.ms',
    defaultMessage: 'The maximum amount of time in ms that the transaction coordinator will wait before proactively expire a producer\'s transactional id without receiving any transaction status updates from it.',
  },
  uncleanLeaderElectionEnable: {
    id: 'broker.unclean.leader.election.enable',
    defaultMessage: 'Indicates whether to enable replicas not in the ISR set to be elected as leader as a last resort, even though doing so may result in data loss',
  },
  zookeeperConnectionTimeoutMs: {
    id: 'broker.zookeeper.connection.timeout.ms',
    defaultMessage: 'The max time that the client waits to establish a connection to zookeeper. If not set, the value in zookeeper.session.timeout.ms is used',
  },
  zookeeperMaxInFlightRequests: {
    id: 'broker.zookeeper.max.in.flight.requests',
    defaultMessage: 'The maximum number of unacknowledged requests the client will send to Zookeeper before blocking.',
  },
  zookeeperSessionTimeoutMs: {
    id: 'broker.zookeeper.session.timeout.ms',
    defaultMessage: 'Zookeeper session timeout',
  },
  zookeeperSetAcl: {
    id: 'broker.zookeeper.set.acl',
    defaultMessage: 'Set client to use secure ACLs',
  },
  brokerIdGenerationEnable: {
    id: 'broker.broker.id.generation.enable',
    defaultMessage: 'Enable automatic broker id generation on the server. When enabled the value configured for reserved.broker.max.id should be reviewed.',
  },
  brokerRack: {
    id: 'broker.broker.rack',
    defaultMessage: 'Rack of the broker. This will be used in rack aware replication assignment for fault tolerance. Examples: `RACK1`, `us-east-1d`',
  },
  connectionsMaxIdleMs: {
    id: 'broker.connections.max.idle.ms',
    defaultMessage: 'Idle connections timeout: the server socket processor threads close the connections that idle more than this',
  },
  controlledShutdownEnable: {
    id: 'broker.controlled.shutdown.enable',
    defaultMessage: 'Enable controlled shutdown of the server',
  },
  controlledShutdownMaxRetries: {
    id: 'broker.controlled.shutdown.max.retries',
    defaultMessage: 'Controlled shutdown can fail for multiple reasons. This determines the number of retries when such failure happens',
  },
  controlledShutdownRetryBackoffMs: {
    id: 'broker.controlled.shutdown.retry.backoff.ms',
    defaultMessage: 'Before each retry, the system needs time to recover from the state that caused the previous failure (Controller fail over, replica lag etc). This config determines the amount of time to wait before retrying.',
  },
  controllerSocketTimeoutMs: {
    id: 'broker.controller.socket.timeout.ms',
    defaultMessage: 'The socket timeout for controller-to-broker channels',
  },
  defaultReplicationFactor: {
    id: 'broker.default.replication.factor',
    defaultMessage: 'default replication factors for automatically created topics',
  },
  delegationTokenExpiryTimeMs: {
    id: 'broker.delegation.token.expiry.time.ms',
    defaultMessage: 'The token validity time in seconds before the token needs to be renewed. Default value 1 day.',
  },
  delegationTokenMasterKey: {
    id: 'broker.delegation.token.master.key',
    defaultMessage: 'Master/secret key to generate and verify delegation tokens. Same key must be configured across all the brokers.  If the key is not set or set to empty string, brokers will disable the delegation token support.',
  },
  delegationTokenMaxLifetimeMs: {
    id: 'broker.delegation.token.max.lifetime.ms',
    defaultMessage: 'The token has a maximum lifetime beyond which it cannot be renewed anymore. Default value 7 days.',
  },
  deleteRecordsPurgatoryPurgeIntervalRequests: {
    id: 'broker.delete.records.purgatory.purge.interval.requests',
    defaultMessage: 'The purge interval (in number of requests) of the delete records request purgatory',
  },
  fetchPurgatoryPurgeIntervalRequests: {
    id: 'broker.fetch.purgatory.purge.interval.requests',
    defaultMessage: 'The purge interval (in number of requests) of the fetch request purgatory',
  },
  groupInitialRebalanceDelayMs: {
    id: 'broker.group.initial.rebalance.delay.ms',
    defaultMessage: 'The amount of time the group coordinator will wait for more consumers to join a new group before performing the first rebalance. A longer delay means potentially fewer rebalances, but increases the time until processing begins.',
  },
  groupMaxSessionTimeoutMs: {
    id: 'broker.group.max.session.timeout.ms',
    defaultMessage: 'The maximum allowed session timeout for registered consumers. Longer timeouts give consumers more time to process messages in between heartbeats at the cost of a longer time to detect failures.',
  },
  groupMinSessionTimeoutMs: {
    id: 'broker.group.min.session.timeout.ms',
    defaultMessage: 'The minimum allowed session timeout for registered consumers. Shorter timeouts result in quicker failure detection at the cost of more frequent consumer heartbeating, which can overwhelm broker resources.',
  },
  interBrokerListenerName: {
    id: 'broker.inter.broker.listener.name',
    defaultMessage: 'Name of listener used for communication between brokers. If this is unset, the listener name is defined by security.inter.broker.protocol. It is an error to set this and security.inter.broker.protocol properties at the same time.',
  },
  interBrokerProtocolVersion: {
    id: 'broker.inter.broker.protocol.version',
    defaultMessage: 'Specify which version of the inter-broker protocol will be used. This is typically bumped after all brokers were upgraded to a new version. Example of some valid values are: 0.8.0, 0.8.1, 0.8.1.1, 0.8.2, 0.8.2.0, 0.8.2.1, 0.9.0.0, 0.9.0.1 Check ApiVersion for the full list.',
  },
  logCleanerBackoffMs: {
    id: 'broker.log.cleaner.backoff.ms',
    defaultMessage: 'The amount of time to sleep when there are no logs to clean',
  },
  logCleanerDedupeBufferSize: {
    id: 'broker.log.cleaner.dedupe.buffer.size',
    defaultMessage: 'The total memory used for log deduplication across all cleaner threads',
  },
  logCleanerDeleteRetentionMs: {
    id: 'broker.log.cleaner.delete.retention.ms',
    defaultMessage: 'How long are delete records retained?',
  },
  logCleanerEnable: {
    id: 'broker.log.cleaner.enable',
    defaultMessage: 'Enable the log cleaner process to run on the server. Should be enabled if using any topics with a cleanup.policy=compact including the internal offsets topic. If disabled those topics will not be compacted and continually grow in size.',
  },
  logCleanerIoBufferLoadFactor: {
    id: 'broker.log.cleaner.io.buffer.load.factor',
    defaultMessage: 'Log cleaner dedupe buffer load factor. The percentage full the dedupe buffer can become. A higher value will allow more log to be cleaned at once but will lead to more hash collisions',
  },
  logCleanerIoBufferSize: {
    id: 'broker.log.cleaner.io.buffer.size',
    defaultMessage: 'The total memory used for log cleaner I/O buffers across all cleaner threads',
  },
  logCleanerIoMaxBytesPerSecond: {
    id: 'broker.log.cleaner.io.max.bytes.per.second',
    defaultMessage: 'The log cleaner will be throttled so that the sum of its read and write i/o will be less than this value on average',
  },
  logCleanerMinCleanableRatio: {
    id: 'broker.log.cleaner.min.cleanable.ratio',
    defaultMessage: 'The minimum ratio of dirty log to total log for a log to eligible for cleaning',
  },
  logCleanerMinCompactionLagMs: {
    id: 'broker.log.cleaner.min.compaction.lag.ms',
    defaultMessage: 'The minimum time a message will remain uncompacted in the log. Only applicable for logs that are being compacted.',
  },
  logCleanerThreads: {
    id: 'broker.log.cleaner.threads',
    defaultMessage: 'The number of background threads to use for log cleaning',
  },
  logCleanupPolicy: {
    id: 'broker.log.cleanup.policy',
    defaultMessage: 'The default cleanup policy for segments beyond the retention window. A comma separated list of valid policies. Valid policies are: "delete" and "compact"',
  },
  logIndexIntervalBytes: {
    id: 'broker.log.index.interval.bytes',
    defaultMessage: 'The interval with which we add an entry to the offset index',
  },
  logIndexSizeMaxBytes: {
    id: 'broker.log.index.size.max.bytes',
    defaultMessage: 'The maximum size in bytes of the offset index',
  },
  logMessageFormatVersion: {
    id: 'broker.log.message.format.version',
    defaultMessage: 'Specify the message format version the broker will use to append messages to the logs. The value should be a valid ApiVersion. Some examples are: 0.8.2, 0.9.0.0, 0.10.0, check ApiVersion for more details. By setting a particular message format version, the user is certifying that all the existing messages on disk are smaller or equal than the specified version. Setting this value incorrectly will cause consumers with older versions to break as they will receive messages with a format that they don\'t understand.',
  },
  logMessageTimestampDifferenceMaxMs: {
    id: 'broker.log.message.timestamp.difference.max.ms',
    defaultMessage: 'The maximum difference allowed between the timestamp when a broker receives a message and the timestamp specified in the message. If log.message.timestamp.type=CreateTime, a message will be rejected if the difference in timestamp exceeds this threshold. This configuration is ignored if log.message.timestamp.type=LogAppendTime.The maximum timestamp difference allowed should be no greater than log.retention.ms to avoid unnecessarily frequent log rolling.',
  },
  logMessageTimestampType: {
    id: 'broker.log.message.timestamp.type',
    defaultMessage: 'Define whether the timestamp in the message is message create time or log append time. The value should be either `CreateTime` or `LogAppendTime`',
  },
  logPreallocate: {
    id: 'broker.log.preallocate',
    defaultMessage: 'Should pre allocate file when create new segment? If you are using Kafka on Windows, you probably need to set it to true.',
  },
  logRetentionCheckIntervalMs: {
    id: 'broker.log.retention.check.interval.ms',
    defaultMessage: 'The frequency in milliseconds that the log cleaner checks whether any log is eligible for deletion',
  },
  maxConnectionsPerIp: {
    id: 'broker.max.connections.per.ip',
    defaultMessage: 'The maximum number of connections we allow from each ip address',
  },
  maxConnectionsPerIpOverrides: {
    id: 'broker.max.connections.per.ip.overrides',
    defaultMessage: 'Per-ip or hostname overrides to the default maximum number of connections',
  },
  maxIncrementalFetchSessionCacheSlots: {
    id: 'broker.max.incremental.fetch.session.cache.slots',
    defaultMessage: 'The maximum number of incremental fetch sessions that we will maintain.',
  },
  numPartitions: {
    id: 'broker.num.partitions',
    defaultMessage: 'The default number of log partitions per topic',
  },
  passwordEncoderOldSecret: {
    id: 'broker.password.encoder.old.secret',
    defaultMessage: 'The old secret that was used for encoding dynamically configured passwords. This is required only when the secret is updated. If specified, all dynamically encoded passwords are decoded using this old secret and re-encoded using password.encoder.secret when broker starts up.',
  },
  passwordEncoderSecret: {
    id: 'broker.password.encoder.secret',
    defaultMessage: 'The secret used for encoding dynamically configured passwords for this broker.',
  },
  principalBuilderClass: {
    id: 'broker.principal.builder.class',
    defaultMessage: 'The fully qualified name of a class that implements the KafkaPrincipalBuilder interface, which is used to build the KafkaPrincipal object used during authorization. This config also supports the deprecated PrincipalBuilder interface which was previously used for client authentication over SSL. If no principal builder is defined, the default behavior depends on the security protocol in use. For SSL authentication, the principal name will be the distinguished name from the client certificate if one is provided; otherwise, if client authentication is not required, the principal name will be ANONYMOUS. For SASL authentication, the principal will be derived using the rules defined by sasl.kerberos.principal.to.local.rules if GSSAPI is in use, and the SASL authentication ID for other mechanisms. For PLAINTEXT, the principal will be ANONYMOUS.',
  },
  producerPurgatoryPurgeIntervalRequests: {
    id: 'broker.producer.purgatory.purge.interval.requests',
    defaultMessage: 'The purge interval (in number of requests) of the producer request purgatory',
  },
  queuedMaxRequestBytes: {
    id: 'broker.queued.max.request.bytes',
    defaultMessage: 'The number of queued bytes allowed before no more requests are read',
  },
  replicaFetchBackoffMs: {
    id: 'broker.replica.fetch.backoff.ms',
    defaultMessage: 'The amount of time to sleep when fetch partition error occurs.',
  },
  replicaFetchMaxBytes: {
    id: 'broker.replica.fetch.max.bytes',
    defaultMessage: 'The number of bytes of messages to attempt to fetch for each partition. This is not an absolute maximum, if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made. The maximum record batch size accepted by the broker is defined via message.max.bytes (broker config) or max.message.bytes (topic config).',
  },
  replicaFetchResponseMaxBytes: {
    id: 'broker.replica.fetch.response.max.bytes',
    defaultMessage: 'Maximum bytes expected for the entire fetch response. Records are fetched in batches, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made. As such, this is not an absolute maximum. The maximum record batch size accepted by the broker is defined via message.max.bytes (broker config) or max.message.bytes (topic config).',
  },
  reservedBrokerMaxId: {
    id: 'broker.reserved.broker.max.id',
    defaultMessage: 'Max number that can be used for a broker.id',
  },
  saslEnabledMechanisms: {
    id: 'broker.sasl.enabled.mechanisms',
    defaultMessage: 'The list of SASL mechanisms enabled in the Kafka server. The list may contain any mechanism for which a security provider is available. Only GSSAPI is enabled by default.',
  },
  saslJaasConfig: {
    id: 'broker.sasl.jaas.config',
    defaultMessage: 'JAAS login context parameters for SASL connections in the format used by JAAS configuration files. JAAS configuration file format is described here. The format for the value is: \'  (=)*;\'',
  },
  saslKerberosKinitCmd: {
    id: 'broker.sasl.kerberos.kinit.cmd',
    defaultMessage: 'Kerberos kinit command path.',
  },
  saslKerberosMinTimeBeforeRelogin: {
    id: 'broker.sasl.kerberos.min.time.before.relogin',
    defaultMessage: 'Login thread sleep time between refresh attempts.',
  },
  saslKerberosPrincipalToLocalRules: {
    id: 'broker.sasl.kerberos.principal.to.local.rules',
    defaultMessage: 'A list of rules for mapping from principal names to short names (typically operating system usernames). The rules are evaluated in order and the first rule that matches a principal name is used to map it to a short name. Any later rules in the list are ignored. By default, principal names of the form \\{username\\}/\\{hostname\\}@\\{REALM\\} are mapped to \\{username\\}. For more details on the format please see  security authorization and acls. Note that this configuration is ignored if an extension of KafkaPrincipalBuilder is provided by the principal.builder.class configuration.',
  },
  saslKerberosServiceName: {
    id: 'broker.sasl.kerberos.service.name',
    defaultMessage: 'The Kerberos principal name that Kafka runs as. This can be defined either in Kafka\'s JAAS config or in Kafka\'s config.',
  },
  saslKerberosTicketRenewJitter: {
    id: 'broker.sasl.kerberos.ticket.renew.jitter',
    defaultMessage: 'Percentage of random jitter added to the renewal time.',
  },
  saslKerberosTicketRenewWindowFactor: {
    id: 'broker.sasl.kerberos.ticket.renew.window.factor',
    defaultMessage: 'Login thread will sleep until the specified window factor of time from last refresh to ticket\'s expiry has been reached, at which time it will try to renew the ticket.',
  },
  saslMechanismInterBrokerProtocol: {
    id: 'broker.sasl.mechanism.inter.broker.protocol',
    defaultMessage: 'SASL mechanism used for inter-broker communication. Default is GSSAPI.',
  },
  securityInterBrokerProtocol: {
    id: 'broker.security.inter.broker.protocol',
    defaultMessage: 'Security protocol used to communicate between brokers. Valid values are: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL. It is an error to set this and inter.broker.listener.name properties at the same time.',
  },
  sslCipherSuites: {
    id: 'broker.ssl.cipher.suites',
    defaultMessage: 'A list of cipher suites. This is a named combination of authentication, encryption, MAC and key exchange algorithm used to negotiate the security settings for a network connection using TLS or SSL network protocol. By default all the available cipher suites are supported.',
  },
  sslClientAuth: {
    id: 'broker.ssl.client.auth',
    defaultMessage: 'Configures kafka broker to request client authentication. The following settings are common:   ssl.client.auth=required If set to required client authentication is required. ssl.client.auth=requested This means client authentication is optional. unlike requested , if this option is set client can choose not to provide authentication information about itself ssl.client.auth=none This means client authentication is not needed.',
  },
  sslEnabledProtocols: {
    id: 'broker.ssl.enabled.protocols',
    defaultMessage: 'The list of protocols enabled for SSL connections.',
  },
  sslKeyPassword: {
    id: 'broker.ssl.key.password',
    defaultMessage: 'The password of the private key in the key store file. This is optional for client.',
  },
  sslKeymanagerAlgorithm: {
    id: 'broker.ssl.keymanager.algorithm',
    defaultMessage: 'The algorithm used by key manager factory for SSL connections. Default value is the key manager factory algorithm configured for the Java Virtual Machine.',
  },
  sslKeystoreLocation: {
    id: 'broker.ssl.keystore.location',
    defaultMessage: 'The location of the key store file. This is optional for client and can be used for two-way authentication for client.',
  },
  sslKeystorePassword: {
    id: 'broker.ssl.keystore.password',
    defaultMessage: 'The store password for the key store file. This is optional for client and only needed if ssl.keystore.location is configured. ',
  },
  sslKeystoreType: {
    id: 'broker.ssl.keystore.type',
    defaultMessage: 'The file format of the key store file. This is optional for client.',
  },
  sslProtocol: {
    id: 'broker.ssl.protocol',
    defaultMessage: 'The SSL protocol used to generate the SSLContext. Default setting is TLS, which is fine for most cases. Allowed values in recent JVMs are TLS, TLSv1.1 and TLSv1.2. SSL, SSLv2 and SSLv3 may be supported in older JVMs, but their usage is discouraged due to known security vulnerabilities.',
  },
  sslProvider: {
    id: 'broker.ssl.provider',
    defaultMessage: 'The name of the security provider used for SSL connections. Default value is the default security provider of the JVM.',
  },
  sslTrustmanagerAlgorithm: {
    id: 'broker.ssl.trustmanager.algorithm',
    defaultMessage: 'The algorithm used by trust manager factory for SSL connections. Default value is the trust manager factory algorithm configured for the Java Virtual Machine.',
  },
  sslTruststoreLocation: {
    id: 'broker.ssl.truststore.location',
    defaultMessage: 'The location of the trust store file. ',
  },
  sslTruststorePassword: {
    id: 'broker.ssl.truststore.password',
    defaultMessage: 'The password for the trust store file. If a password is not set access to the truststore is still available, but integrity checking is disabled.',
  },
  sslTruststoreType: {
    id: 'broker.ssl.truststore.type',
    defaultMessage: 'The file format of the trust store file.',
  },
  alterConfigPolicyClassName: {
    id: 'broker.alter.config.policy.class.name',
    defaultMessage: 'The alter configs policy class that should be used for validation. The class should implement the org.apache.kafka.server.policy.AlterConfigPolicy interface.',
  },
  alterLogDirsReplicationQuotaWindowNum: {
    id: 'broker.alter.log.dirs.replication.quota.window.num',
    defaultMessage: 'The number of samples to retain in memory for alter log dirs replication quotas',
  },
  alterLogDirsReplicationQuotaWindowSizeSeconds: {
    id: 'broker.alter.log.dirs.replication.quota.window.size.seconds',
    defaultMessage: 'The time span of each sample for alter log dirs replication quotas',
  },
  authorizerClassName: {
    id: 'broker.authorizer.class.name',
    defaultMessage: 'The authorizer class that should be used for authorization',
  },
  createTopicPolicyClassName: {
    id: 'broker.create.topic.policy.class.name',
    defaultMessage: 'The create topic policy class that should be used for validation. The class should implement the org.apache.kafka.server.policy.CreateTopicPolicy interface.',
  },
  delegationTokenExpiryCheckIntervalMs: {
    id: 'broker.delegation.token.expiry.check.interval.ms',
    defaultMessage: 'Scan interval to remove expired delegation tokens.',
  },
  listenerSecurityProtocolMap: {
    id: 'broker.listener.security.protocol.map',
    defaultMessage: 'Map between listener names and security protocols. This must be defined for the same security protocol to be usable in more than one port or IP. For example, internal and external traffic can be separated even if SSL is required for both. Concretely, the user could define listeners with names INTERNAL and EXTERNAL and this property as: `INTERNAL:SSL,EXTERNAL:SSL`. As shown, key and value are separated by a colon and map entries are separated by commas. Each listener name should only appear once in the map. Different security (SSL and SASL) settings can be configured for each listener by adding a normalised prefix (the listener name is lowercased) to the config name. For example, to set a different keystore for the INTERNAL listener, a config with name `listener.name.internal.ssl.keystore.location` would be set. If the config for the listener name is not set, the config will fallback to the generic config (i.e. `ssl.keystore.location`). ',
  },
  metricReporters: {
    id: 'broker.metric.reporters',
    defaultMessage: 'A list of classes to use as metrics reporters. Implementing the org.apache.kafka.common.metrics.MetricsReporter interface allows plugging in classes that will be notified of new metric creation. The JmxReporter is always included to register JMX statistics.',
  },
  metricsNumSamples: {
    id: 'broker.metrics.num.samples',
    defaultMessage: 'The number of samples maintained to compute metrics.',
  },
  metricsRecordingLevel: {
    id: 'broker.metrics.recording.level',
    defaultMessage: 'The highest recording level for metrics.',
  },
  metricsSampleWindowMs: {
    id: 'broker.metrics.sample.window.ms',
    defaultMessage: 'The window of time a metrics sample is computed over.',
  },
  passwordEncoderCipherAlgorithm: {
    id: 'broker.password.encoder.cipher.algorithm',
    defaultMessage: 'The Cipher algorithm used for encoding dynamically configured passwords.',
  },
  passwordEncoderIterations: {
    id: 'broker.password.encoder.iterations',
    defaultMessage: 'The iteration count used for encoding dynamically configured passwords.',
  },
  passwordEncoderKeyLength: {
    id: 'broker.password.encoder.key.length',
    defaultMessage: 'The key length used for encoding dynamically configured passwords.',
  },
  passwordEncoderKeyfactoryAlgorithm: {
    id: 'broker.password.encoder.keyfactory.algorithm',
    defaultMessage: 'The SecretKeyFactory algorithm used for encoding dynamically configured passwords. Default is PBKDF2WithHmacSHA512 if available and PBKDF2WithHmacSHA1 otherwise.',
  },
  quotaWindowNum: {
    id: 'broker.quota.window.num',
    defaultMessage: 'The number of samples to retain in memory for client quotas',
  },
  quotaWindowSizeSeconds: {
    id: 'broker.quota.window.size.seconds',
    defaultMessage: 'The time span of each sample for client quotas',
  },
  replicationQuotaWindowNum: {
    id: 'broker.replication.quota.window.num',
    defaultMessage: 'The number of samples to retain in memory for replication quotas',
  },
  replicationQuotaWindowSizeSeconds: {
    id: 'broker.replication.quota.window.size.seconds',
    defaultMessage: 'The time span of each sample for replication quotas',
  },
  sslEndpointIdentificationAlgorithm: {
    id: 'broker.ssl.endpoint.identification.algorithm',
    defaultMessage: 'The endpoint identification algorithm to validate server hostname using server certificate. ',
  },
  sslSecureRandomImplementation: {
    id: 'broker.ssl.secure.random.implementation',
    defaultMessage: 'The SecureRandom PRNG implementation to use for SSL cryptography operations. ',
  },
  transactionAbortTimedOutTransactionCleanupIntervalMs: {
    id: 'broker.transaction.abort.timed.out.transaction.cleanup.interval.ms',
    defaultMessage: 'The interval at which to rollback transactions that have timed out',
  },
  transactionRemoveExpiredTransactionCleanupIntervalMs: {
    id: 'broker.transaction.remove.expired.transaction.cleanup.interval.ms',
    defaultMessage: 'The interval at which to remove transactions that have expired due to transactional.id.expiration.ms passing',
  },
  zookeeperSyncTimeMs: {
    id: 'broker.zookeeper.sync.time.ms',
    defaultMessage: 'How far a ZK follower can be behind a ZK leader',
  },
});
