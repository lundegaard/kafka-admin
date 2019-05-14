import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import KafkaConnect from './KafkaConnect';

/**
 * Class containing the web interface for Kafka Connect.
 * @author Martin Kocisky
 */
class CardKafkaConnect extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <KafkaConnect />
    );
  }
}

export default injectIntl(CardKafkaConnect);
