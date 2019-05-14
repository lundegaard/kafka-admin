import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import { getBrokerId } from '../reducers';
import PageBroker from '../components/PageBroker';

export default connect(
  applySpec({
    brokerId: getBrokerId,
  }),
)(PageBroker);
