import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

class Editor extends Component {
  static propTypes = {
    /** For available modes see https://github.com/thlorenz/brace/tree/master/mode */
    mode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape(Object),
    ]).isRequired,
  };

  componentDidMount() {
    const { mode } = this.props;

    if (typeof mode === 'object') {
      this.aceEditor.editor.getSession().setMode(mode);
    }
  }

  getMode() {
    const { mode } = this.props;

    if (typeof mode === 'string') {
      return mode;
    }

    return 'text';
  }

  render() {
    return (
      <AceEditor
        ref={(aceEditor) => {
          this.aceEditor = aceEditor;
        }}
        theme="monokai"
        width="100%"
        fontSize={14}
        showPrintMargin={false}
        enableBasicAutocompletion
        {...this.props}
        mode={this.getMode()}
      />
    );
  }
}

export default Editor;
