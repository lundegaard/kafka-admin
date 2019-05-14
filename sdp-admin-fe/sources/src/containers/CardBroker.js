import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { applySpec } from 'ramda';

import CardBroker from '../components/CardBroker';
import { getBrokers, getBrokerTabKey } from '../reducers';
import { selectBroker } from '../actions';
import { BROKER_SHAPE } from '../constants/Shapes';

class CardBrokerWrapper extends Component {
  static propTypes = {
    brokers: PropTypes.arrayOf(PropTypes.shape(BROKER_SHAPE)).isRequired,
    location: PropTypes.shape(Object).isRequired,
    selectBroker: PropTypes.func.isRequired,
    tabKey: PropTypes.string.isRequired,
  };

  componentWillUpdate({ brokers }) {
    const broker = this.getBroker(brokers);

    if (!broker) return;

    this.props.selectBroker(broker);
  }

  getBroker(brokers) {
    const { location: { pathname } } = this.props;
    const id = pathname.substr(pathname.lastIndexOf('/') + 1);
    return brokers.find(broker => broker.id.toString() === id);
  }

  render() {
    const { tabKey } = this.props;

    return (
      <CardBroker tabKey={tabKey} />
    );
  }
}

export default connect(
  applySpec({
    brokers: getBrokers,
    tabKey: getBrokerTabKey,
  }),
  {
    selectBroker,
  },
)(withRouter(CardBrokerWrapper));
