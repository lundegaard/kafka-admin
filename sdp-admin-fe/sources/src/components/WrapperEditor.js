import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import Editor from './Editor';
import { INPUT_SHAPE } from '../constants/Shapes';

const WrapperEditor = ({
  className,
  height,
  input: { value, onChange },
  editorName,
  mode,
  meta: { touched, error },
}) => (
  <Form.Item
    validateStatus={touched && error ? 'error' : 'success'}
    help={touched && error}
  >
    <Editor
      className={touched && error ? `redOutline ${className}` : className}
      mode={mode}
      name={editorName}
      height={height}
      value={value}
      onChange={onChange}
      focus
    />
  </Form.Item>
);

WrapperEditor.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  input: PropTypes.shape(INPUT_SHAPE).isRequired,
  editorName: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  /** For available modes see https://github.com/thlorenz/brace/tree/master/mode */
  mode: PropTypes.string,
};

WrapperEditor.defaultProps = {
  className: null,
  height: null,
  mode: 'text',
};

export default WrapperEditor;
