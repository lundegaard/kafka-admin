import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Button, Icon, InputNumber, Row, Select, Slider, Table } from 'antd';
import { path, o, map, equals, defaultTo } from 'ramda';
import { isNumeric } from 'ramda-extension';
import moment from 'moment';

import messages from './messages';
import {
  debounce,
  defaultToEmptyList,
  getBeginningOffsetFromTopicInfo,
  getEndOffsetFromTopicInfo,
  nonNegative,
} from '../../utils';
import { TOPIC_INFO_SHAPE } from '../../constants/Shapes';
import JsonViewEditor from '../Editor/JsonViewEditor';

const getPartitions = o(defaultToEmptyList, path(['partitions']));
const mapPartitions = o(map((e) =>
  (<Select.Option key={e.partition} value={e.partition}>
    <span>{e.partition}</span><span className="text-weak">{` (${e.endOffset})`}</span>
  </Select.Option>)), getPartitions);

const changeOffsetHandler = (fn, endOffset, beginningOffset, number, difference = 0) => (value) => {
  if (isNumeric(value) && (value + difference) >= beginningOffset
    && (value + difference) <= (endOffset - number)) {
    fn(value + difference);
  }
};

const epochToDateFormat = (epoch) => (
  isNumeric(epoch) ? moment(epoch).format('YYYY-MM-DD HH:mm:ss') : 'null'
);

/**
 * Tab component showing custom topic messages from Kafka
 * Key parameters are, topic info for selected topic, selected partition number, selected offset
 * and number of messages to show
 *
 * e.g. if you have offset=30, number=20, it will show 20 messages from 30 - 49
 */
class TabMessages extends Component {
  static propTypes = {
    /** callback for requesting topic messages from Kafka, with prameters
     * (topic name, partition, number of messages, offset fo first message) */
    getTopicMessages: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    /** If 'true', the table will has loading graphics */
    messagesFetching: PropTypes.bool.isRequired,
    /** number of messages to show */
    number: PropTypes.number,
    /** offset number of first displayed message */
    offset: PropTypes.number,
    /** selected partition number */
    partition: PropTypes.number,
    /** function, refresh messages data */
    refreshMessages: PropTypes.func.isRequired,
    /** function, the setter for first offset of displayed messages */
    setOffset: PropTypes.func.isRequired,
    /** function, the setter for selected partition */
    setPartition: PropTypes.func.isRequired,
    /** Topic data about selected topic, with configuration, partition and replication info */
    topicInfo: PropTypes.shape(TOPIC_INFO_SHAPE).isRequired,
    /** array with messages to display */
    topicMessages: PropTypes.arrayOf(Object).isRequired,
  };

  static defaultProps = {
    number: null,
    offset: null,
    partition: null,
  };

  componentWillReceiveProps(nextProps) {
    const {
      number,
      offset,
      partition,
      topicInfo,
    } = nextProps;

    const hasChanges = !(
      equals(topicInfo.name, this.props.topicInfo.name) &&
        equals(partition, this.props.partition) &&
        equals(offset, this.props.offset) &&
        equals(
          getEndOffsetFromTopicInfo(partition, topicInfo),
          getEndOffsetFromTopicInfo(this.props.partition, this.props.topicInfo)));

    if (hasChanges) {
      this.getTopicMessages(topicInfo.name, partition, number, offset);
    }
  }

  getTopicMessages = debounce(this.props.getTopicMessages, 500);

  render() {
    const {
      intl: { formatMessage },
      messagesFetching,
      number,
      offset,
      partition,
      refreshMessages,
      setOffset,
      setPartition,
      topicInfo,
      topicMessages,
    } = this.props;

    const beginningOffset = getBeginningOffsetFromTopicInfo(partition, topicInfo);
    const endOffset = getEndOffsetFromTopicInfo(partition, topicInfo);

    const tmpMessagesToShow = endOffset - beginningOffset < number
      ? (endOffset - beginningOffset) - 1 : number - 1;
    const messagesToShow = nonNegative(tmpMessagesToShow);
    const lastMessageOffset = endOffset === beginningOffset ? beginningOffset : endOffset - 1;
    // from input
    const fromValue = offset;
    const fromMin = beginningOffset;
    const fromMax = lastMessageOffset - messagesToShow;
    // to input
    const toValue = offset + messagesToShow;
    const toMin = beginningOffset + messagesToShow;
    const toMax = lastMessageOffset;

    return (
      <div>
        <Row className="mb--16" type="flex" align="middle">
          <span className="text-label">
            <FormattedMessage {...messages.partitionsSelect} />
          </span>
          <Select
            className="ml--8 mr--16 w--200"
            onChange={setPartition}
            value={partition}
          >
            {mapPartitions(topicInfo)}
          </Select>
          <span className="text-label">
            <FormattedMessage {...messages.offsetFrom} />
          </span>
          <InputNumber
            className="ml--8 mr--16 w--150"
            value={fromValue}
            min={fromMin}
            max={fromMax}
            onChange={changeOffsetHandler(setOffset, endOffset, beginningOffset, number)}
          />
          <span className="text-label">
            <FormattedMessage {...messages.offsetTo} />
          </span>
          <InputNumber
            className="ml--8 mr--16 w--150"
            value={toValue}
            min={toMin}
            max={toMax}
            onChange={changeOffsetHandler(setOffset, endOffset, beginningOffset, number,
              -messagesToShow)}
          />
          <Slider
            className="ml--16 mr--16"
            style={{ flexGrow: 100 }}
            marks={{
              [toMin]: String(beginningOffset),
              [toMax]: String(toMax),
            }}
            value={toValue}
            min={toMin}
            max={toMax}
            onChange={changeOffsetHandler(setOffset, endOffset, beginningOffset, number,
              -messagesToShow)}
          />
          <Button className="ml--32" onClick={() => refreshMessages(topicInfo.name)}>
            <Icon className="text-label" type="reload" />
          </Button>
        </Row>
        <Row>
          <Table
            columns={[
              {
                title: formatMessage(messages.offset),
                dataIndex: 'offset',
                className: 'ws--nowrap',
              }, {
                title: formatMessage(messages.key),
                dataIndex: 'kafkaKey',
                className: 'ws--nowrap',
              }, {
                title: formatMessage(messages.timestamp),
                dataIndex: 'timestamp',
                className: 'ws--nowrap',
                render: (text, record) => (<span>{epochToDateFormat(record.timestamp)}</span>),
              }, {
                title: formatMessage(messages.value),
                dataIndex: 'value',
                className: 'text-overflow-dots-parent',
                render: (text) => <div className="text-overflow-dots">{text}</div>,
              }]
            }
            dataSource={topicMessages.reduce((acc, message) => ([...acc, {
              offset: message.offset,
              key: message.offset,
              kafkaKey: defaultTo('null', message.key),
              timestamp: defaultTo('null', message.timestamp),
              value: defaultTo('', message.value),
            }]), [])
            }
            expandedRowRender={(record) => <JsonViewEditor value={record.value} />}
            expandRowByClick
            size="small"
            pagination={false}
            loading={messagesFetching}
          />
        </Row>
      </div>
    );
  }
}

export default injectIntl(TabMessages);
