import React, { Component } from 'react';
import {
  Button, Card, Row, Col,
} from 'antd';
import PropTypes from 'prop-types';
import { getConnectorPlugins, putConnectorPluginsConfigValidate } from './KafkaConnectREST';

/**
 * Class containing the Kafka Connector Plugins view.
 * @author Martin Kocisky
 */
class KafkaConnectorPlugins extends Component {
    static propTypes = {
      isHidden: PropTypes.bool.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        dataPlugins: 'No data',
        textAreaName: 'No data',
        textAreaData: 'No data',
      };
    }

    componentWillMount() {
      this.getConnectorPluginsData();
    }

    getConnectorPluginsData() {
      getConnectorPlugins().then((jsonData) => {
        const jsD = jsonData.map((entry) => (
          <li>
            { entry.class }
          </li>
        ));
        this.setState({ dataPlugins: jsD });
      });
    }

    submitPluginValidate() {
      putConnectorPluginsConfigValidate(this.state.textAreaName, this.state.textAreaData).then(
        (jsonData) => {
          const transformedJson = JSON.stringify(jsonData, null, 4);
          const tArea = document.getElementById('tArea');
          tArea.value = transformedJson;
          tArea.rows = transformedJson.split('\n').length;
        },
      );
    }

    render() {
      if (this.props.isHidden) return (<div />);
      const examplePlugin = '{\n'
            + '    "connector.class": "...",\n'
            + '    "tasks.max": "...",\n'
            + '    "topics": "..."\n'
            + '}';
      return (
        <div className="KafkaConnectorPlugins">
          <Card title="Kafka Connector Plugins">
            <Row>
              <h4>Plugins:</h4>
              <ol>
                { this.state.dataPlugins }
              </ol>
            </Row>
            <Row>
              <Card title="Validate Plugin">
                <Row>
                  <Col>
                    <div>
                      <h5 align="left">Name</h5>
                      <textarea
                        className="form-control"
                        placeholder="Name"
                        rows="1"
                        cols="80"
                        onChange={(event) => this.setState({ textAreaName: event.target.value })}
                      />
                      <br />
                      <h5 align="left">Data</h5>
                      <textarea
                        id="tArea"
                        className="form-control"
                        rows={examplePlugin.split('\n').length}
                        cols="80"
                        defaultValue={examplePlugin}
                        onChange={(event) => this.setState({ textAreaData: event.target.value })}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Button
                        type="danger"
                        onClick={() => this.submitPluginValidate()}
                      >
                          Validate Plugin
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Row>
          </Card>
        </div>
      );
    }
}

export default KafkaConnectorPlugins;
