import React, { Component } from 'react';
import { Button, Card } from 'antd';
import KafkaConnectorList from './KafkaConnectorList';
import KafkaNewConnector from './KafkaNewConnector';
import KafkaConnectorPlugins from './KafkaConnectorPlugins';

/**
 * Class representing the menu section of Kafka Connect Interface.
 * @author Martin Kocisky
 */
class KafkaConnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectors: true,
      showNewConnector: false,
      showConnectorPlugins: false,
    };
  }

  changeShowConnectors() {
    this.setState({
      showConnectors: true,
      showNewConnector: false,
      showConnectorPlugins: false,
    });
  }

  changeShowNewConnector() {
    this.setState({
      showConnectors: false,
      showNewConnector: true,
      showConnectorPlugins: false,
    });
  }

  changeShowConnectorPlugins() {
    this.setState({
      showConnectors: false,
      showNewConnector: false,
      showConnectorPlugins: true,
    });
  }

  render() {
    return (
      <Card title="Kafka Connect">
        <div>
          <Button.Group>
            <Button type="primary" onClick={() => this.changeShowConnectors()}>Connectors</Button>
            <Button type="primary" onClick={() => this.changeShowNewConnector()}>New Connector</Button>
            <Button type="primary" onClick={() => this.changeShowConnectorPlugins()}>Show Plugins</Button>
          </Button.Group>
        </div>
        <br />
        <div>
          <KafkaConnectorList isHidden={!this.state.showConnectors} />
          <KafkaNewConnector isHidden={!this.state.showNewConnector} />
          <KafkaConnectorPlugins isHidden={!this.state.showConnectorPlugins} />
        </div>
      </Card>
    );
  }
}

export default KafkaConnect;
