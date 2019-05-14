import React from 'react';
import PropTypes from 'prop-types';
import { defaultTo } from 'ramda';

import { getRegExpGI } from '../utils';

/**
 * Return colored span by mached regEx values, matches will be red,
 * other text default color
 */
const ColoredSpanByRegExp = ({ filterValue, text, className }) => {
  const regExp = getRegExpGI(filterValue);
  return (
    <span className={className}>
      { filterValue === '' ? text
        : text.split(regExp).map((textPart, i) => (
          i > 0
            ?
            [
              // eslint-disable-next-line react/no-array-index-key
              <span key={i} className="color--orange">
                {defaultTo(null, text.match(regExp)[i - 1])}
              </span>,
              textPart
            ]
            : textPart
        ))
      }
    </span>
  );
};

ColoredSpanByRegExp.propTypes = {
  filterValue: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ColoredSpanByRegExp.defaultProps = {
  className: null,
};

export default ColoredSpanByRegExp;
