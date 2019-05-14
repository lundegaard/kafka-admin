import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getConnectorTasks } from './KafkaConnectREST';
import KafkaConnectorTaskListEntry from './KafkaConnectorTaskListEntry';

/**
 * Class containing the Kafka Connector Task List view.
 * @author Martin Kocisky
 */
class KafkaConnectorTaskList extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      isHidden: PropTypes.bool.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        data: 'No data',
      };
    }

    componentWillMount() {
      getConnectorTasks(this.props.name).then((jsonData) => {
        const jsD = jsonData.map((entry, index) => (
          <div>
            <KafkaConnectorTaskListEntry name={this.props.name} index={index} data={entry} />
          </div>
        ));
        this.setState({ data: jsD });
      });
    }

    render() {
      if (this.props.isHidden) {
        return (<div />);
      }
      return (
        <div className="KafkaConnectorTaskList">
          <hr />
          <div>
            <h4 align="left">Tasks</h4>
          </div>
          <div>
            {this.state.data}
          </div>
        </div>
      );
    }
}

export default KafkaConnectorTaskList;
