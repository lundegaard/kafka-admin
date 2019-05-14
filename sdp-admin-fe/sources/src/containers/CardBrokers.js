import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import CardBrokers from '../components/CardBrokers';

import { redirect, selectBroker } from '../actions';
import { getBrokers } from '../reducers';

export default connect(
  applySpec({
    brokers: getBrokers,
  }),
  {
    redirect,
    selectBroker,
  },
)(CardBrokers);
