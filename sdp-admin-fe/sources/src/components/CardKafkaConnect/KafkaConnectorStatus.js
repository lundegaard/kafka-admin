import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Class containing the Kafka Connector Status view.
 * @author Martin Kocisky
 */
class KafkaConnectorStatus extends Component {
    static propTypes = {
      isHidden: PropTypes.bool.isRequired,
      data: PropTypes.string.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        isHidden: false,
      };
    }

    render() {
      if (this.props.isHidden && !this.state.isHidden) return (<div />);
      return (
        <div className="KafkaConnectorStatus">
          <hr />
          <div>
            <h4 align="left">Status</h4>
          </div>
          <div>
            <textarea
              className="form-control"
              rows={this.props.data.split('\n').length}
              cols="80"
              value={this.props.data}
              readOnly
              disabled
              style={{ border: 'none' }}
            />
          </div>
        </div>
      );
    }
}

export default KafkaConnectorStatus;
