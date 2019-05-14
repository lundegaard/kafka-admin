import { connect } from 'react-redux';
import { alwaysEmptyObject } from 'ramda-extension';

import Link from '../components/Link';

import { redirect } from '../actions';

export default connect(
  alwaysEmptyObject,
  {
    redirect,
  },
)(Link);
