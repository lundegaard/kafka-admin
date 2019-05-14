import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import CardConsumerGroups from '../components/CardConsumerGroups';

import { callGetConsumerGroups } from '../actions';
import {
  getConsumerGroups,
  getIntervalDelay,
} from '../reducers';

export default connect(
  applySpec({
    consumerGroups: getConsumerGroups,
    intervalDelay: getIntervalDelay,
  }),
  {
    callGetConsumerGroups,
  },
)(CardConsumerGroups);
