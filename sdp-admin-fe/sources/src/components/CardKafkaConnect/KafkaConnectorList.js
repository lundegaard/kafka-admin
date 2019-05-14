import React, { Component } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { getConnectors } from './KafkaConnectREST';
import KafkaConnectorListEntry from './KafkaConnectorListEntry';

/**
 * Class containing the Kafka Connector List view.
 * @author Martin Kocisky
 */
class KafkaConnectorList extends Component {
    static propTypes = {
      isHidden: PropTypes.bool.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        data: 'No data',
      };
    }

    componentWillMount() {
      this.getConnectorsData();
    }

    getConnectorsData() {
      getConnectors().then((jsonData) => {
        const jsD = jsonData.map((entry) => (
          <div>
            <KafkaConnectorListEntry name={entry} />
            <hr />
          </div>
        ));
        this.setState({ data: jsD });
      });
    }

    render() {
      if (this.props.isHidden) return (<div />);
      return (
        <div className="KafkaConnectorList">
          <Card title="Connectors">
            {this.state.data}
          </Card>
        </div>
      );
    }
}

export default KafkaConnectorList;
