import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Card, Table } from 'antd';
import { path } from 'ramda';

import messages from './messages';
import { TOPIC_LIST_PAGINATION_SIZE } from '../../constants';
import { CONSUMER_GROUP } from '../../constants/Shapes';
import { diffString, diffNumber } from '../../utils';

const getGroupId = path(['id']);
const getState = path(['state']);
const getConsumersCount = path(['consumers', 'length']);
const getAssignmentStrategy = path(['assignmentStrategy']);

class CardConsumerGroups extends Component {
  static propTypes = {
    callGetConsumerGroups: PropTypes.func.isRequired,
    className: PropTypes.string,
    consumerGroups: PropTypes.arrayOf(PropTypes.shape(CONSUMER_GROUP)).isRequired,
    intervalDelay: PropTypes.number.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  componentDidMount() {
    this.props.callGetConsumerGroups();
    this.interval = setInterval(this.props.callGetConsumerGroups, this.props.intervalDelay);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.intervalDelay !== this.props.intervalDelay) {
      this.props.callGetConsumerGroups();
      clearInterval(this.interval);
      this.interval = setInterval(this.props.callGetConsumerGroups, nextProps.intervalDelay);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      className,
      consumerGroups,
      intl: { formatMessage },
    } = this.props;
    return (
      <Card title={formatMessage(messages.title)} className={className}>
        <Table
          size="small"
          pagination={{ pageSize: TOPIC_LIST_PAGINATION_SIZE }}
          rowKey="groupId"
          columns={[{
            title: formatMessage(messages.tableId),
            dataIndex: 'groupId',
            sorter: diffString('groupId'),
            defaultSortOrder: 'ascend',
          }, {
            title: formatMessage(messages.tableState),
            dataIndex: 'state',
            sorter: diffString('state'),
          }, {
            title: formatMessage(messages.tableConsumers),
            dataIndex: 'consumers',
            sorter: diffNumber('consumers'),
          }, {
            title: formatMessage(messages.tableAssignmentStrategy),
            dataIndex: 'assignmentStrategy',
            sorter: diffString('assignmentStrategy'),
          }]}
          dataSource={consumerGroups.reduce((acc, consumerGroup) => ([...acc, {
            groupId: getGroupId(consumerGroup),
            state: getState(consumerGroup),
            consumers: getConsumersCount(consumerGroup),
            assignmentStrategy: getAssignmentStrategy(consumerGroup),
          }]), [])}
        />
      </Card>
    );
  }
}

export default injectIntl(CardConsumerGroups);
