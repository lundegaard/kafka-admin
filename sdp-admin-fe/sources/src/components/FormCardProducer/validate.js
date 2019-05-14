import { PRODUCER_FIELDS } from '../../constants/forms';
import messages from './messages';

const validate = (values, { intl: { formatMessage } }) => {
  const errors = {};
  if (!values[PRODUCER_FIELDS.TOPIC]) {
    errors[PRODUCER_FIELDS.TOPIC] = formatMessage(messages.errorEmptyTopic);
  }
  if (!values[PRODUCER_FIELDS.VALUE]) {
    errors[PRODUCER_FIELDS.VALUE] = formatMessage(messages.errorEmptyMessage);
  }
  return errors;
};

export default validate;
