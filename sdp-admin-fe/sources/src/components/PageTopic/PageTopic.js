import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { path } from 'ramda';
import { FormattedMessage } from 'react-intl';

import { Breadcrumb, Col, Row } from 'antd';

import CardTopicInfo from '../../containers/CardTopicInfo';
import Link from '../../containers/Link';
import { url } from '../../constants';
import commonMessages from '../commonMessages';

const getTopicName = path(['props', 'params', 'topicName']);

class PageTopic extends Component {
  static propTypes = {
    topicName: PropTypes.string,
    onShowTopicInfo: PropTypes.func.isRequired,
  };

  static defaultProps = {
    topicName: '',
  };

  componentDidMount() {
    this.props.onShowTopicInfo(getTopicName(this));
  }

  componentWillReceiveProps(nextProps) {
    this.props.onShowTopicInfo(nextProps.topicName);
  }

  render() {
    const topicName = getTopicName(this);
    return (
      <Row>
        <Col span={24} className="pb--8">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>
              <Link to={url.TOPICS}>
                <FormattedMessage {...commonMessages.pageTopics} />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {`[${topicName}]`}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <CardTopicInfo />
        </Col>
      </Row>
    );
  }
}

export default PageTopic;
