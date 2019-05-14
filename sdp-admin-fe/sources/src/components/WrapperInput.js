import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';

import { INPUT_SHAPE } from '../constants/Shapes';

const WrapperInput = ({
  input: { value, onChange },
  className,
  label,
  meta: { touched, error },
}) => (
  <Form.Item
    validateStatus={touched && error ? 'error' : 'success'}
    help={touched && error}
  >
    <Input
      className={className}
      placeholder={label}
      onChange={onChange}
      value={value}
    />
  </Form.Item>
);

WrapperInput.propTypes = {
  className: PropTypes.string,
  input: PropTypes.shape(INPUT_SHAPE).isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

WrapperInput.defaultProps = {
  className: null,
  label: null,
};

export default WrapperInput;
