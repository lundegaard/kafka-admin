import React from 'react';
import PropTypes from 'prop-types';

import Editor from '../Editor';
import { JSONFormattedInputWithParse } from '../../utils';

const EDITOR_LINE_HEIGHT = 14.40000057220459;
const DEFAULT_LINES_NUMBER = 10;
const MIN_GAP_HEIGHT = 1;
/**
 * calculate viewHeight for Editor, from number of expected lines
 * ( attributes in json + closing brackets)
 *
 * eg.
 * {
 *    "a": 2,
 *    "b": {
 *       "c": 1,
 *       "d": 2,
 *    }
 * }
 *
 * will return 7, (attributes 4 + closing brackets 2 + first open 1 )
 *
 * @param value - json string
 * @returns {string} px height
 */
const calcViewHeight = (value) => {
  try {
    return `${(value.match(/([^\\]":|})/g).length + 1) * EDITOR_LINE_HEIGHT + MIN_GAP_HEIGHT}px`;
  } catch (e) {
    return `${EDITOR_LINE_HEIGHT * DEFAULT_LINES_NUMBER + MIN_GAP_HEIGHT}px`;
  }
};

const JsonViewEditor = ({ value }) => (
  <Editor
    mode="json"
    theme="github"
    name="MessageView"
    value={JSONFormattedInputWithParse(value)}
    width="100%"
    height={calcViewHeight(value)}
    fontSize={12}
    showGutter={false}
    highlightActiveLine={false}
    wrapEnabled
    readOnly
  />
);

JsonViewEditor.propTypes = {
  value: PropTypes.string.isRequired,
};

export default JsonViewEditor;
