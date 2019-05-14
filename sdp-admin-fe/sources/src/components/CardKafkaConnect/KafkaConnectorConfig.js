import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { putConnectorConfig } from './KafkaConnectREST';

/**
 * Class containing the Kafka Connector Config view.
 * @author Martin Kocisky
 */
class KafkaConnectorConfig extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      isHidden: PropTypes.bool.isRequired,
      data: PropTypes.string.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        textAreaData: 'No data',
      };
    }

    submitConnectorConfig() {
      putConnectorConfig(this.props.name, this.state.textAreaData).then((jsonData) => {
        const transformedJson = JSON.stringify(jsonData, null, 4);
        const tArea = document.getElementById('tArea');
        tArea.value = transformedJson;
        tArea.rows = transformedJson.split('\n').length;
      });
    }

    render() {
      const exampleConfiguration = '{\n'
            + '    "connector.class": "io.confluent.connect.hdfs.HdfsSinkConnector",\n'
            + '    "tasks.max": "10",\n'
            + '    "topics": "test-topic",\n'
            + '    "hdfs.url": "hdfs://fakehost:9000",\n'
            + '    "hadoop.conf.dir": "/opt/hadoop/conf",\n'
            + '    "hadoop.home": "/opt/hadoop",\n'
            + '    "flush.size": "100",\n'
            + '    "rotate.interval.ms": "1000"\n'
            + '}';
      if (this.props.isHidden) return (<div />);
      return (
        <div>
          <hr />
          <div>
            <h4 align="left">Configuration</h4>
          </div>
          <Row>
            <Col>
              <div>
                <textarea
                  id="tArea"
                  className="form-control"
                  rows={this.props.data.split('\n').length}
                  cols="80"
                  defaultValue={exampleConfiguration}
                  onChange={(event) => this.setState({ textAreaData: event.target.value })}
                />
              </div>
            </Col>
            <Col>
              <div>
                <Button
                  type="primary"
                  onClick={() => this.submitConnectorConfig()}
                >
                    Submit Configuration
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
}

export default KafkaConnectorConfig;
