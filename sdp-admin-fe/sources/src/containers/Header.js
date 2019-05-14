import { connect } from 'react-redux';

import { applySpec } from 'ramda';

import Header from '../components/Header';
import { getIntervalDelay } from '../reducers';

import { setIntervalDelay } from '../actions';

export default connect(
  applySpec({
    intervalDelay: getIntervalDelay,
  }),
  {
    setIntervalDelay,
  },
)(Header);
