import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {
  Col, Input, Row, Table, Tooltip,
} from 'antd';
import { path } from 'ramda';
import { toCamelCase } from 'ramda-extension';

import messages from './messages';
import { BROKER_SHAPE } from '../../constants/Shapes';
import { filterConfigsByName, getCustomConfigTooltipTitle } from '../../utils';
import { MOUSE_ENTER_DELAY, SEARCH_DEBOUNCE_MS } from '../../constants';
import { debounce } from '../../utils/ramdaDebounce';
import commonMessages from '../commonMessages';
import ColoredSpanByRegExp from '../ColoredSpanByRegExp';
import brokerMessages from './brokerMessages';

const TabConfigs = ({
  broker: { configs },
  filterValue,
  intl: { formatMessage },
  setFilterValue,
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
          pagination={{ defaultPageSize: 200 }}
          dataSource={filterConfigsByName(filterValue, configs)}
          columns={[
            {
              title: formatMessage(messages.name),
              dataIndex: 'name',
              width: '50%',
              render: (text, record) => (
                <Tooltip
                  title={brokerMessages[toCamelCase(record.name)]
                    ? formatMessage(brokerMessages[toCamelCase(record.name)])
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
              title: formatMessage(messages.value),
              dataIndex: 'value',
              width: '50%',
              render: (text, record) => (
                <Tooltip
                  title={getCustomConfigTooltipTitle(record.name, record.value, formatMessage)}
                  mouseEnterDelay={MOUSE_ENTER_DELAY}
                  placement="top"
                >
                  <span>{record.value}</span>
                </Tooltip>
              ),
            },
          ]}
        />
      </Col>
    </Row>
  );
}

TabConfigs.propTypes = {
  broker: PropTypes.shape(BROKER_SHAPE).isRequired,
  filterValue: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  setFilterValue: PropTypes.func.isRequired,
};

export default injectIntl(TabConfigs);
