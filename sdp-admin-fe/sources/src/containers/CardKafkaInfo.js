import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import CardKafkaInfo from '../components/CardKafkaInfo';
import { getBrokers, getTopics } from '../reducers';
import { redirect } from '../actions';

export default connect(
  applySpec({
    brokers: getBrokers,
    topics: getTopics,
  }),
  {
    redirect,
  },
)(CardKafkaInfo);
