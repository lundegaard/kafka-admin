import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import FormCardProducer from '../components/FormCardProducer';
import { getTopics } from '../reducers';

export default connect(
  applySpec({
    topics: getTopics,
  }),
)(FormCardProducer);
