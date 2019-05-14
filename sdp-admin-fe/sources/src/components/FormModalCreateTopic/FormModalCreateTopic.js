import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Modal, Row } from 'antd';
import { o } from 'ramda';

import messages from './messages';
import commonMessages from '../commonMessages';
import { FORMS, CREATE_TOPIC_FIELDS } from '../../constants/forms';
import WrapperInput from '../WrapperInput';
import WrapperInputNumber from '../WrapperInputNumber';
import validate from './validate';

const FormModalCreateTopic = ({
  formToggleVisibleCreateTopic,
  handleSubmit,
  intl: { formatMessage },
  submit,
  visible,
}) => (
  <Modal
    visible={visible}
    title={formatMessage(messages.titleCreateTopic)}
    okText={formatMessage(commonMessages.create)}
    onCancel={formToggleVisibleCreateTopic}
    onOk={() => submit(FORMS.CREATE_TOPIC_FORM)}
  >
    <form onSubmit={handleSubmit}>
      <Row>
        <span className="text-label mr--16 mt--8 " >
          <FormattedMessage {...messages.fieldTopic} />
        </span>
        <Field
          className="w--200 mt--8"
          component={WrapperInput}
          name={CREATE_TOPIC_FIELDS.TOPIC_NAME}
          type="text"
        />
      </Row>
      <Row>
        <span className="text-label mr--16 mt--8 " >
          <FormattedMessage {...messages.fieldPartitions} />
        </span>
        <Field
          className="w--200 mt--8"
          component={WrapperInputNumber}
          max={Infinity}
          min={1}
          name={CREATE_TOPIC_FIELDS.PARTITIONS}
          type="number"
        />
      </Row>
      <Row>
        <span className="text-label mr--16 mt--8 " >
          <FormattedMessage {...messages.fieldReplications} />
        </span>
        <Field
          className="w--200 mt--8"
          component={WrapperInputNumber}
          max={Infinity}
          min={1}
          name={CREATE_TOPIC_FIELDS.REPLICATION_FACTOR}
          type="number"
        />
      </Row>
    </form>
  </Modal>
);

FormModalCreateTopic.propTypes = {
  submit: PropTypes.func.isRequired,
  formToggleVisibleCreateTopic: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default o(
  injectIntl,
  reduxForm({
    form: FORMS.CREATE_TOPIC_FORM,
    validate,
  }),
)(FormModalCreateTopic);

