import React from 'react';
import { FormattedMessage } from 'react-intl';

import commonMessages from '../commonMessages';

const PageNotFound = () => (
  <div>
    <h1><FormattedMessage {...commonMessages.pageNotFound} /></h1>
  </div>
);

export default PageNotFound;
