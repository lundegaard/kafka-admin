import React from 'react';
import PropTypes from 'prop-types';

import { alwaysEmptyObject } from 'ramda-extension';

const Link = ({
  onClick, className, children, redirect, to,
}) => (
  <a
    className={className}
    role="button"
    tabIndex="0"
    onClick={to ? () => redirect(to) : onClick}
  >
    { children }
  </a>
);

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  redirect: PropTypes.func.isRequired,
  to: PropTypes.string,
};

Link.defaultProps = {
  children: null,
  className: null,
  onClick: alwaysEmptyObject,
  to: null,
};

export default Link;
