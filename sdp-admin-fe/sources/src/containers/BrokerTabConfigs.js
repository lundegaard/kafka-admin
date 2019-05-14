import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import { setConfigBrokerFilterValue } from '../actions';
import { getBroker, getBrokerFilterValue } from '../reducers';
import TabConfigs from '../components/CardBroker/TabConfigs';

export default connect(
  applySpec({
    broker: getBroker,
    filterValue: getBrokerFilterValue,
  }),
  {
    setFilterValue: setConfigBrokerFilterValue,
  },
)(TabConfigs);
