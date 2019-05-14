import { connect } from 'react-redux';

import { alwaysEmptyObject } from 'ramda-extension';

import PageTopic from '../components/PageTopic';
import { onShowTopicInfo } from '../actions';

export default connect(
  alwaysEmptyObject,
  {
    onShowTopicInfo,
  },
)(PageTopic);
