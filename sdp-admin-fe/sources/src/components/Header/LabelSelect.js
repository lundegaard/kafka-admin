import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

import { convertMsToS } from '../../utils';
import './styles.less';

const LabelSelect = ({ value }) => (
  <span>
    <Icon className="header-refresh-icon mr--8" type="reload" />
    <span>{`${convertMsToS(value)}s`}</span>
  </span>
);

LabelSelect.propTypes = {
  value: PropTypes.number.isRequired,
};

export default LabelSelect;
