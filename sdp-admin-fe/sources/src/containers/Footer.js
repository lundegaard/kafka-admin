import { connect } from 'react-redux';

import { applySpec } from 'ramda';

import Footer from '../components/Footer';
import { getVersion } from '../reducers';

export default connect(
  applySpec({
    version: getVersion,
  }),
)(Footer);
