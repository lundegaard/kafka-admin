/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Col, Input, Row, Table, Tooltip } from 'antd';
import { prop, path } from 'ramda';
import { toCamelCase } from 'ramda-extension';

import { CONFIG_SHAPE, TOPIC_INFO_SHAPE } from '../../constants/Shapes';
import { MOUSE_ENTER_DELAY, SEARCH_DEBOUNCE_MS } from '../../constants';
import {
  diffNumber,
  diffString,
  filterConfigsByName,
  toStringOrUnknownOrEmpty,
  getCustomConfigTooltipTitle,
} from '../../utils';
import { debounce } from '../../utils/ramdaDebounce';
import commonMessages from '../commonMessages';
import ColoredSpanByRegExp from '../ColoredSpanByRegExp';
import EditableCell from './EditableCell';
import messages from './messages';
import topicMessages from './topicMessages';

const setDefaultColor = (record) => (record.default ? '' : 'background--snow-gray');

const TabConfigs = ({
  editingConfig: { editingKey, editingValue },
  filterValue,
  intl: { formatMessage },
  resetEditing,
  setConfig,
  setEditing,
  setEditingValue,
  setFilterValue,
  topic: { name },
  topicConfigs,
}) => {
  const debouncedFilterValueSet = debounce(SEARCH_DEBOUNCE_MS, setFilterValue)();
  return (
    <Row>
      <Col span={24} lg={18} xl={12}>
        <Row className="pb--8" type="flex" justify="end">
          <Col span={24} lg={12} xl={10} xxl={8}>
            <Input.Search
              defaultValue={filterValue}
              placeholder={formatMessage(commonMessages.msgInputSearch)}
              onChange={(e) => debouncedFilterValueSet(path(['target', 'value'], e))}
            />
          </Col>
        </Row>
        <Table
          size="small"
          rowKey="name"
          rowClassName={setDefaultColor}
          pagination={false}
          dataSource={filterConfigsByName(filterValue, topicConfigs)}
          columns={[
            {
              title: formatMessage(messages.name),
              dataIndex: 'name',
              className: 'ws--nowrap',
              sorter: diffString('name'),
              defaultSortOrder: 'ascend',
              render: (text, record) => (
                <Tooltip
                  title={topicMessages[toCamelCase(record.name)]
                    ? formatMessage(topicMessages[toCamelCase(record.name)])
                    : ''
                  }
                  mouseEnterDelay={MOUSE_ENTER_DELAY}
                  placement="right"
                >
                  <span>
                    <ColoredSpanByRegExp
                      className="help"
                      filterValue={filterValue}
                      text={record.name}
                    />
                  </span>
                </Tooltip>
              ),
            },
            {
              title: formatMessage(messages.default),
              dataIndex: 'default',
              className: 'ws--nowrap',
              sorter: diffNumber('default'),
              defaultSortOrder: 'ascend',
              render: (text, record) => (
                <span>{toStringOrUnknownOrEmpty(record.default, formatMessage)}</span>
              ),
            },
            {
              title: formatMessage(messages.value),
              dataIndex: 'value',
              width: '100%',
              render: (text, record) => (
                <Tooltip
                  title={getCustomConfigTooltipTitle(record.name, record.value, formatMessage)}
                  mouseEnterDelay={MOUSE_ENTER_DELAY}
                  placement="top"
                >
                  <span>
                    <EditableCell
                      editable={record.name === editingKey}
                      text={text}
                      editingValue={editingValue}
                      onChange={({ target: { value } }) => setEditingValue(value)}
                      onConfirm={({ target: { value } }) => setConfig(name, record.name, value,
                        formatMessage(messages.configUpdatedSuccess),
                        formatMessage(messages.configUpdatedFailed))
                      }
                      onEdit={() => setEditing(record.name, text)}
                      onCancel={resetEditing}
                    />
                  </span>
                </Tooltip>
              ),
            },
          ]}
        />
      </Col>
    </Row>
  );
};

TabConfigs.propTypes = {
  defaultConfigs: PropTypes.arrayOf(PropTypes.shape(CONFIG_SHAPE)).isRequired,
  editingConfig: PropTypes.shape({
    editingKey: PropTypes.string,
    editingValue: PropTypes.string,
  }).isRequired,
  filterValue: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  resetEditing: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  setEditingValue: PropTypes.func.isRequired,
  setFilterValue: PropTypes.func.isRequired,
  topic: PropTypes.shape(TOPIC_INFO_SHAPE).isRequired,
  topicConfigs: PropTypes.arrayOf(PropTypes.shape(CONFIG_SHAPE)).isRequired,

};

export default injectIntl(TabConfigs);
