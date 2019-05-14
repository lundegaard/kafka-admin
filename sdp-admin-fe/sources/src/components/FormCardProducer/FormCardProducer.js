import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import {
  Button, Card, Col, Row,
} from 'antd';
import { o } from 'ramda';

import WrapperSelect from '../WrapperSelect';
import WrapperInput from '../WrapperInput';
import WrapperEditor from '../WrapperEditor';
import { FORMS, PRODUCER_FIELDS } from '../../constants/forms';
import messages from './messages';
import commonMessages from '../commonMessages';
import validate from './validate';

const FormCardProducer = ({
  handleSubmit,
  intl: { formatMessage },
  submitting,
  topics,
}) => (
  <Card>
    <form onSubmit={handleSubmit}>
      <Row type="flex" align="top">
        <span className="text-label mr--16 mt--8 required--star">
          <FormattedMessage {...messages.topic} />
        </span>
        <Field
          className="w--200 mr--16"
          component={WrapperSelect}
          name={PRODUCER_FIELDS.TOPIC}
          options={topics.map(item => ({
            value: item,
            name: item,
          }))}
          type="text"
        />
        <span className="text-label mr--16 mt--8 ">
          <FormattedMessage {...messages.key} />
        </span>
        <Field
          className="w--200 mr--16"
          component={WrapperInput}
          label={formatMessage(messages.enterKey)}
          name={PRODUCER_FIELDS.KEY}
          type="text"
        />
        <Button htmlType="submit" disabled={submitting}>
          <FormattedMessage {...commonMessages.send} />
        </Button>
      </Row>

      <Row>
        <span className="text-label inline--block mb--8 required--star">
          <FormattedMessage {...messages.messageValue} />
        </span>
      </Row>
      <Row>
        <Col span={24}>
          <Field
            className="producerEditor"
            component={WrapperEditor}
            height="50vh"
            mode="text"
            name={PRODUCER_FIELDS.VALUE}
            editorName="message-producer"
            type="text"
          />
        </Col>
      </Row>
    </form>
  </Card>
);

FormCardProducer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  submitting: PropTypes.bool.isRequired,
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default o(
  injectIntl,
  reduxForm({
    form: FORMS.PRODUCER_FORM,
    validate,
  }),
)(FormCardProducer);
