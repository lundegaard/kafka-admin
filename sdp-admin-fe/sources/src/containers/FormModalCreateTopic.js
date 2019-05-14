import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { applySpec } from 'ramda';

import FormModalCreateTopic from '../components/FormModalCreateTopic';
import {
  formToggleVisibleCreateTopic,
} from '../actions';
import {
  getFormVisibleCreateTopic,
} from '../reducers';

export default connect(
  applySpec({
    visible: getFormVisibleCreateTopic,
  }),
  {
    submit,
    formToggleVisibleCreateTopic,
  },
)(FormModalCreateTopic);
