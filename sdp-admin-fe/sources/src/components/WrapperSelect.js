import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form } from 'antd';

import { INPUT_SHAPE } from '../constants/Shapes';

const WrapperSelect = ({
  input: { value, onChange },
  className,
  options,
  meta: { touched, error },
}) => (
  <div className={`${className} inline--block`}>
    <Form.Item
      validateStatus={touched && error ? 'error' : 'success'}
      help={touched && error}
    >
      <Select
        value={value}
        onChange={onChange}
        showSearch
      >
        {
          options.map(item => (
            <Select.Option
              key={item.value}
              value={item.value}
            >
              {item.name}
            </Select.Option>
          ))
        }
      </Select>
    </Form.Item>
  </div>
);

WrapperSelect.propTypes = {
  className: PropTypes.string,
  input: PropTypes.shape(INPUT_SHAPE).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

WrapperSelect.defaultProps = {
  className: null,
};

export default WrapperSelect;
