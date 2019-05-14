import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Button, Card, Modal, Table, Input, Row, Col, Checkbox } from 'antd';
import {
  add,
  always,
  applySpec,
  cond,
  converge,
  endsWith,
  find,
  map,
  o,
  path,
  pipe,
  prop,
  propEq,
  reduce,
  reject,
  startsWith,
  subtract,
  T,
} from 'ramda';
import { equalsToFalse, defaultToEmptyArray } from 'ramda-extension';

import Link from '../../containers/Link';
import FormModalCreateTopic from '../../containers/FormModalCreateTopic';
import { url, TOPIC_LIST_PAGINATION_SIZE, SEARCH_DEBOUNCE_MS } from '../../constants';
import { TOPIC_INFO_SHAPE } from '../../constants/Shapes';
import {
  diffNumber,
  diffString,
  filterConfigsByName,
  millisToDays,
} from '../../utils';
import { debounce } from '../../utils/ramdaDebounce';
import ColoredSpanByRegExp from '../ColoredSpanByRegExp';
import commonMessages from '../commonMessages';
import messages from './messages';

const getName = prop('name');
const getTotalMessages = (topicItem) => o(
  reduce(add, 0),
  map(converge(
    subtract,
    [prop('endOffset'), prop('beginningOffset')],
  )),
)(path(['partitions'], topicItem));
const getNumberOfPartitions = path(['partitions', 'length']);
const getNumberOfReplicas = path(['partitions', '0', 'replicas', 'length']);
const getNonDefaultRetentionDays = pipe(
  prop('configs'),
  defaultToEmptyArray,
  find(propEq('name', 'retention.ms')),
  cond([
    [o(equalsToFalse, prop('default')), prop('value')],
    [T, always(NaN)],
  ]),
);

const showDeleteConfirm = (topic, callDeleteTopic, formatMessage) => {
  Modal.confirm({
    title: formatMessage(messages.deleteQuestion),
    content: topic,
    okText: formatMessage(commonMessages.yes),
    okType: 'danger',
    cancelText: formatMessage(commonMessages.no),
    onOk() {
      callDeleteTopic(topic);
    },
  });
};

const filterInternalTopics = reject((data) => (endsWith('changelog', getName(data))
    || endsWith('repartition', getName(data))
    || startsWith('_', getName(data))),
);

const filterTopicListDataSource = (
  filterValue,
  internalTopicsVisible,
  topicListDataSource,
) => (filterConfigsByName(filterValue, internalTopicsVisible
  ? topicListDataSource
  : filterInternalTopics(topicListDataSource),
));

class CardTopicList extends Component {
  static propTypes = {
    callCreateTopic: PropTypes.func.isRequired,
    callDeleteTopic: PropTypes.func.isRequired,
    callGetTopicsInfo: PropTypes.func.isRequired,
    className: PropTypes.string,
    filterValue: PropTypes.string.isRequired,
    formToggleVisibleCreateTopic: PropTypes.func.isRequired,
    internalTopicsVisible: PropTypes.bool.isRequired,
    intervalDelay: PropTypes.number.isRequired,
    intl: intlShape.isRequired,
    setFilterValue: PropTypes.func.isRequired,
    toggleTopicListInternalTopicsVisible: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string).isRequired,
    topicsInfo: PropTypes.arrayOf(PropTypes.shape(TOPIC_INFO_SHAPE)).isRequired,
  };

  static defaultProps = {
    className: '',
  };

  componentDidMount() {
    this.props.callGetTopicsInfo();
    this.interval = setInterval(this.props.callGetTopicsInfo, this.props.intervalDelay);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.intervalDelay !== this.props.intervalDelay) {
      this.props.callGetTopicsInfo();
      clearInterval(this.interval);
      this.interval = setInterval(this.props.callGetTopicsInfo, nextProps.intervalDelay);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      callCreateTopic,
      callDeleteTopic,
      callGetTopicsInfo,
      className,
      filterValue,
      formToggleVisibleCreateTopic,
      internalTopicsVisible,
      intl: { formatMessage },
      setFilterValue,
      toggleTopicListInternalTopicsVisible,
      topicsInfo,
    } = this.props;
    const topicListDataSource = topicsInfo.map(applySpec({
      key: getName,
      retention: pipe(
        getNonDefaultRetentionDays,
        millisToDays,
        (value) => formatMessage(commonMessages.formatDay, { value }),
      ),
      totalMessages: getTotalMessages,
      partitions: getNumberOfPartitions,
      replicas: getNumberOfReplicas,
      name: getName,
    }));
    const debouncedFilterValueSet = debounce(SEARCH_DEBOUNCE_MS, setFilterValue)();
    return (
      <Card title={formatMessage(messages.title)} className={className}>
        <Row className="mb--16">
          <Col span={12} lg={6} xl={5} xxl={4} className="pr--16">
            <Input.Search
              defaultValue={filterValue}
              placeholder={formatMessage(commonMessages.msgInputSearch)}
              onChange={(e) => debouncedFilterValueSet(path(['target', 'value'], e))}
            />
          </Col>
          <Col span={12} lg={6} xl={5} xxl={4} className="mt--8">
            <Checkbox
              onChange={toggleTopicListInternalTopicsVisible}
              checked={internalTopicsVisible}
            >
              <FormattedMessage {...messages.showInternal} />
            </Checkbox>
          </Col>
          <Col className="text--right">
            <Button.Group>
              <Button onClick={formToggleVisibleCreateTopic}>
                <FormattedMessage {...messages.newTopic} />
              </Button>
              <Button onClick={callGetTopicsInfo}>
                <FormattedMessage {...commonMessages.refresh} />
              </Button>
            </Button.Group>
          </Col>
        </Row>
        <FormModalCreateTopic onSubmit={callCreateTopic} />
        <Table
          size="small"
          pagination={{ pageSize: TOPIC_LIST_PAGINATION_SIZE }}
          columns={[{
            title: formatMessage(messages.tableTopicName),
            dataIndex: 'name',
            render: (text, record) => (
              <Link to={`${url.TOPIC}/${record.name}`}>
                <ColoredSpanByRegExp
                  filterValue={filterValue}
                  text={record.name}
                />
              </Link>
            ),
            sorter: diffString('name'),
            defaultSortOrder: 'ascend',
          }, {
            title: formatMessage(messages.tableTotalMessages),
            dataIndex: 'totalMessages',
            sorter: diffNumber('totalMessages'),
          }, {
            title: formatMessage(messages.tableRetention),
            dataIndex: 'retention',
            sorter: diffString('retention'),
          }, {
            title: formatMessage(messages.tablePartitions),
            dataIndex: 'partitions',
            sorter: diffNumber('partitions'),
          }, {
            title: formatMessage(messages.tableReplicas),
            dataIndex: 'replicas',
            sorter: diffNumber('replicas'),
          }, {
            title: formatMessage(messages.tableActions),
            key: 'action',
            render: (text, record) => (
              <div>
                <Link onClick={() => showDeleteConfirm(
                  record.name,
                  callDeleteTopic,
                  formatMessage)}
                >
                  <FormattedMessage {...commonMessages.delete} />
                </Link>
              </div>
            ),
          }]}
          dataSource={filterTopicListDataSource(
            filterValue,
            internalTopicsVisible,
            topicListDataSource,
          )}
        />
      </Card>
    );
  }
}
export default injectIntl(CardTopicList);
