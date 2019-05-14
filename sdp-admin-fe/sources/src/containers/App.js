import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import { toggleMenu } from '../actions';
import { getCollapsedMenu } from '../reducers';

import App from '../components/App';

export default connect(
  applySpec({
    collapsedMenu: getCollapsedMenu,
  }),
  {
    toggleMenu,
  },
)(App);
