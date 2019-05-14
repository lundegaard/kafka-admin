import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Row, Tooltip } from 'antd';

const moveCaretAtEnd = ({ target }) => {
  const val = target.value;
  target.value = '';
  target.value = val;
};

const EditableCell = ({
  editable,
  editingValue,
  onCancel,
  onChange,
  onConfirm,
  onEdit,
  text,
}) => (
  <div>
    {
      editable ?
        <Tooltip
          trigger="focus"
          placement="right"
          title="Press Enter to save or click outside to discard changes."
        >
          <Input
            className="small-input"
            size="small"
            value={editingValue}
            autoFocus
            onFocus={moveCaretAtEnd}
            onChange={onChange}
            onPressEnter={onConfirm}
            onBlur={onCancel}
          />
        </Tooltip>
        :
        <Row type="flex" justify="space-between" align="middle">
          {text || <span>&nbsp;</span>}
          <Icon className="pointer" type="edit" onClick={onEdit} />
        </Row>
    }
  </div>
);

EditableCell.propTypes = {
  editable: PropTypes.bool.isRequired,
  editingValue: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,

};

EditableCell.defaultProps = {
  editingValue: '',
};

export default EditableCell;
