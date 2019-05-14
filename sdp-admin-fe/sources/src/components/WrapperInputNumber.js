import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Form } from 'antd';

import { INPUT_SHAPE } from '../constants/Shapes';

const WrapperInputNumber = ({
  className,
  input: { value, onChange },
  label,
  max,
  meta: { touched, error },
  min,
}) => (
  <Form.Item
    validateStatus={touched && error ? 'error' : 'success'}
    help={touched && error}
  >
    <InputNumber
      className={className}
      placeholder={label}
      onChange={onChange}
      min={min}
      max={max}
      value={value}
    />
  </Form.Item>
);

WrapperInputNumber.propTypes = {
  className: PropTypes.string,
  input: PropTypes.shape(INPUT_SHAPE).isRequired,
  label: PropTypes.string,
  max: PropTypes.number.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  min: PropTypes.number.isRequired,
};

WrapperInputNumber.defaultProps = {
  className: null,
  label: null,
};

export default WrapperInputNumber;
