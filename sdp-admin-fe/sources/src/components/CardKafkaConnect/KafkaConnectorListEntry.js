import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import {
  deleteConnector,
  getConnectorConfig,
  getConnectorStatus,
  postConnectorRestart,
  putConnectorPause,
  putConnectorResume,
} from './KafkaConnectREST';
import KafkaConnectorConfig from './KafkaConnectorConfig';
import KafkaConnectorTaskList from './KafkaConnectorTaskList';
import KafkaConnectorStatus from './KafkaConnectorStatus';

/**
 * Class containing the Kafka Connector List Entry view.
 * @author Martin Kocisky
 */
class KafkaConnectorListEntry extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        showStatus: false,
        showConfig: false,
        showTaskList: false,
        statusData: 'none',
        viewData: 'none',
      };
    }

    getCConfig() {
      if (this.state.showConfig) {
        this.setState({ showConfig: false });
        return;
      }
      this.setState({
        showStatus: false,
        showConfig: true,
        showTaskList: false,
      });
      getConnectorConfig(this.props.name).then((jsonData) => {
        const transformedJson = JSON.stringify(jsonData, null, 4);
        this.setState({
          showConfig: true,
          viewData: transformedJson,
        });
      });
    }

    getCStatus() {
      if (this.state.showStatus) {
        this.setState({ showStatus: false });
        return;
      }
      this.setState({
        showStatus: true,
        showConfig: false,
        showTaskList: false,
      });
      getConnectorStatus(this.props.name).then((jsonData) => {
        const transformedJson = JSON.stringify(jsonData, null, 4);
        this.setState({
          showStatus: true,
          statusData: transformedJson,
        });
      });
    }

    getCTasks() {
      if (this.state.showTaskList) {
        this.setState({ showTaskList: false });
        return;
      }
      this.setState({
        showStatus: false,
        showConfig: false,
        showTaskList: true,
      });
    }

    render() {
      return (
        <div>
          <Row gutter={24}>
            <Col span={4}><h3>{this.props.name}</h3></Col>
            <Col span={10}>
              <Button.Group>
                <Button type="primary" onClick={() => this.getCStatus()}>Status</Button>
                <Button type="primary" onClick={() => this.getCConfig()}>Configuration</Button>
                <Button type="primary" onClick={() => this.getCTasks()}>Tasks</Button>
              </Button.Group>
            </Col>
            <Col span={10}>
              <Button.Group>
                <Button type="secondary" onClick={() => postConnectorRestart(this.props.name)}>Restart</Button>
                <Button type="secondary" onClick={() => putConnectorPause(this.props.name)}>Pause</Button>
                <Button type="secondary" onClick={() => putConnectorResume(this.props.name)}>Resume</Button>
                <Button type="danger" onClick={() => deleteConnector(this.props.name)}>Delete</Button>
              </Button.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <KafkaConnectorStatus
                isHidden={!this.state.showStatus}
                data={this.state.statusData}
              />

              <KafkaConnectorConfig
                isHidden={!this.state.showConfig}
                name={this.props.name}
                data={this.state.viewData}
              />

              <KafkaConnectorTaskList
                isHidden={!this.state.showTaskList}
                name={this.props.name}
              />
            </Col>
          </Row>
        </div>
      );
    }
}

export default KafkaConnectorListEntry;
