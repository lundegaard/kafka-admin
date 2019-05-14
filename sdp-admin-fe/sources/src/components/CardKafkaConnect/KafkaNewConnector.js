import React, { Component } from 'react';
import {
  Button, Card, Row, Col,
} from 'antd';
import PropTypes from 'prop-types';
import { postConnectors } from './KafkaConnectREST';

/**
 * Class containing the Kafka Connector New Connector view.
 * @author Martin Kocisky
 */
class KafkaNewConnector extends Component {
    static propTypes = {
      isHidden: PropTypes.bool.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        textAreaData: 'none',
      };
    }

    submitNewConnector() {
      postConnectors(this.state.textAreaData).then((jsonData) => {
        const transformedJson = JSON.stringify(jsonData, null, 4);
        const tArea = document.getElementById('tArea');
        tArea.value = transformedJson;
        tArea.rows = transformedJson.split('\n').length;
      });
    }

    render() {
      if (this.props.isHidden) return (<div />);
      const exampleNewConnector = '{\n'
            + '    "name": "...",\n'
            + '    "config": {\n'
            + '        "connector.class": "...",\n'
            + '        "tasks.max": "...",\n'
            + '        "topics": "...",\n'
            + '        "hdfs.url": "...",\n'
            + '        "hadoop.conf.dir": "...",\n'
            + '        "hadoop.home": "...",\n'
            + '        "flush.size": "...",\n'
            + '        "rotate.interval.ms": "..."\n'
            + '    }\n'
            + '}';
      return (
        <div className="KafkaNewConnector">
          <Card title="Create New Connector">
            <Row>
              <Col>
                <div>
                  <textarea
                    id="tArea"
                    className="form-control"
                    rows={exampleNewConnector.split('\n').length}
                    cols="80"
                    defaultValue={exampleNewConnector}
                    onChange={(event) => this.setState({ textAreaData: event.target.value })}
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <Button
                    type="danger"
                    onClick={() => this.submitNewConnector()}
                  >
                    Submit Connector
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      );
    }
}

export default KafkaNewConnector;
