import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { toast, ToastContainer } from 'react-toastify';
import { url, urlParams } from '../constants';
import translation from '../constants/translation';
import { getLocale } from '../reducers';

import PageCluster from '../components/PageCluster';
import PageNotFound from '../components/PageNotFound';
import PageStreams from '../components/PageStreams';
import PageTopics from '../components/PageTopics';
import PageKafkaConnect from '../components/PageKafkaConnect';

import PageProducer from './PageProducer';
import PageBroker from './PageBroker';
import PageTopic from './PageTopic';

import App from './App';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Root component for this application.
 * @param store containing the state of this applicaiton
 * @param locale of this application
 * @param history common object representing the browser history
 * @param extension allows insert of Routes into the Router of this app
 * @returns {*}
 * @constructor
 */
const Root = ({
  store, locale, history, extension,
}) => (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={translation.en}>
      <Router history={history}>
        <App>
          <ToastContainer
            autoClose={2000}
            position={toast.POSITION.TOP_RIGHT}
            pauseOnHover
            closeOnClick
          />
          <Switch>
            <Route exact path={url.ROOT} component={PageCluster} />
            <Route exact path={`${url.BROKER}/:${urlParams.BROKER_ID}`} component={PageBroker} />
            <Route exact path={`${url.TOPIC}/:${urlParams.TOPIC_NAME}`} component={PageTopic} />
            <Route exact path={url.CLUSTER} component={PageCluster} />
            <Route exact path={url.PRODUCER} component={PageProducer} />
            <Route exact path={url.STREAMS} component={PageStreams} />
            <Route exact path={url.TOPICS} component={PageTopics} />
            <Route exact path={url.KAFKACONNECT} component={PageKafkaConnect} />
            { extension }
            <Route exact path={url.ANY} component={PageNotFound} />
          </Switch>
        </App>
      </Router>
    </IntlProvider>
  </Provider>
);

Root.propTypes = {
  locale: PropTypes.string,
  store: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  extension: PropTypes.shape(),
};

Root.defaultProps = {
  locale: 'en',
  extension: null,
};

export default connect((state) => ({
  locale: getLocale(state),
}))(Root);
