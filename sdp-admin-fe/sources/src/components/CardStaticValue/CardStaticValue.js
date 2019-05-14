import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'antd';
import { cx } from 'ramda-extension';

import { STRING_OR_NUMBER } from '../../constants/Shapes';
import { PIE_VALUE_SIZE } from '../../constants/Graphs';

import GraphVictoryPieValue from '../graphs/GraphVictoryPieValue';

const SIZES = {
  NORMAL: 'normal',
  SMALL: 'small',
};

const spanValueClassNames = (size, valueClassName) => cx(
  'display--block',
  'text--semi-bold',
  'pt--24',
  valueClassName,
  {
    'text--size-3xl': size === SIZES.SMALL,
    'text--size-5xl': size === SIZES.NORMAL,
  },
);

const CardStaticValue = ({
  label,
  pieValue,
  size,
  valueClassName,
  title,
  value,
}) => (
  <Card title={title}>
    <Row>
      <Col className="text--center">
        {
          pieValue
            ? (
              <GraphVictoryPieValue
                value={value}
                height={size === SIZES.SMALL ? PIE_VALUE_SIZE.SMALL_HEIGHT : PIE_VALUE_SIZE.HEIGHT}
                width={size === SIZES.SMALL ? PIE_VALUE_SIZE.SMALL_WIDTH : PIE_VALUE_SIZE.WIDTH}
                fontSize={size === SIZES.SMALL
                  ? PIE_VALUE_SIZE.SMALL_FONT_SIZE
                  : PIE_VALUE_SIZE.FONT_SIZE
              }
              />
            )
            : <span className={spanValueClassNames(size, valueClassName)}>{value}</span>
        }
        { label ? <span className="display--block text--size-l text--regular pb--24">{label}</span> : null }
      </Col>
    </Row>
  </Card>
);

CardStaticValue.propTypes = {
  label: PropTypes.string,
  pieValue: PropTypes.bool,
  size: PropTypes.oneOf([SIZES.SMALL, SIZES.NORMAL]),
  title: PropTypes.string,
  value: STRING_OR_NUMBER.isRequired,
  valueClassName: PropTypes.string,
};

CardStaticValue.defaultProps = {
  label: null,
  pieValue: false,
  size: SIZES.NORMAL,
  title: null,
  valueClassName: null,
};

export default CardStaticValue;
