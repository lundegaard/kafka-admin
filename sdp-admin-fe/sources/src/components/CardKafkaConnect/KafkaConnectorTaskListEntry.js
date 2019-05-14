import React, { Component } from 'react';
import {
  Button, Card, Row, Col,
} from 'antd';
import PropTypes from 'prop-types';
import { getConnectorTaskStatus, postConnectorTaskRestart } from './KafkaConnectREST';

/**
 * Class containing the Kafka Connector Task List Entry view.
 * @author Martin Kocisky
 */
class KafkaConnectorTaskListEntry extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    };


    constructor(props) {
      super(props);
      this.state = {
        status: 'No status data',
      };
    }

    componentWillMount() {
      this.getCTaskStatus();
    }

    getCTaskStatus() {
      getConnectorTaskStatus(this.props.name, this.props.index).then((entry) => {
        const st = JSON.stringify(entry, null, 4);
        this.setState({ status: st });
      });
    }

    transformedData() {
      return JSON.stringify(this.props.data, null, 4);
    }

    render() {
      return (
        <div className="KafkaConnectorTaskListEntry">
          <Card>
            <Row gutter={24}>
              <Col span={2}>
                <h5>
                    Task
                  {this.props.index}
                </h5>
              </Col>
              <Col span={14}>
                <textarea
                  className="form-control"
                  rows={this.transformedData().split('\n').length}
                  cols="65"
                  value={this.transformedData()}
                  readOnly
                  disabled
                  style={{ border: 'none' }}
                />
              </Col>
              <Col span={8}>
                <div>
                  <textarea
                    className="form-control"
                    rows={this.state.status.split('\n').length}
                    cols="40"
                    value={this.state.status}
                    readOnly
                    disabled
                    style={{ border: 'none' }}
                  />
                </div>
                <br />
                <div>
                  <Button
                    type="primary"
                    onClick={() => this.getCTaskStatus()}
                  >
                    Refresh Status
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => postConnectorTaskRestart(this.props.name, this.props.index)}
                  >
                    Restart Task
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      );
    }
}

export default KafkaConnectorTaskListEntry;
