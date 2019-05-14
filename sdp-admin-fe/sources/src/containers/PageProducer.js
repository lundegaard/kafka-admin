import { connect } from 'react-redux';
import { alwaysEmptyObject } from 'ramda-extension';

import PageProducer from '../components/PageProducer';
import { callProduceMessage } from '../actions';

export default connect(
  alwaysEmptyObject,
  {
    produceMessage: callProduceMessage,
  },
)(PageProducer);
