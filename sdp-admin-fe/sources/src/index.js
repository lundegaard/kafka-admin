import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import csLocaleData from 'react-intl/locale-data/cs';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import './resources/index.less';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { version } from '../package.json';
import { init } from './actions';

import { menuItems } from './components/NavigationMenu';
import { entitiesReducers } from './reducers/entities';
import { uiReducers } from './reducers/ui';
import rootReducer from './reducers';
import { history } from './components/history';

/**
 * Function used to initialize the configuration parameters of this application.
 * @param reducer - rootReducer for the entire application
 * @param hst - history object (in current version unchanged)
 * @returns {*[]} array of Root parameters
 */
const openSourceInit = (reducer, hst) => {
  addLocaleData(csLocaleData, enLocaleData);
  const store = configureStore(reducer);
  store.dispatch(init(version));
  return [store, hst];
};

injectTapEventPlugin();

const cfg = openSourceInit(rootReducer, history);

ReactDOM.render(<Root store={cfg[0]} history={cfg[1]} />, document.getElementById('root'));

registerServiceWorker();

/**
 * Extension
 * These named exports may be used to extend this application when imported as a library.
 * To extend this application build it as a 'dev' build. Than import it into your own app.
 * Use Root as a main component of your private application.
 * Extend the NavigationMenu 'menuItems', 'uiReducers' and 'entitiesReducers'.
 * Extension for the Root
 * - object Router with history specified by given 'history' object
 * -- containing private Routes
 * @author Martin Kocisky
 */
export {
  Root, openSourceInit, menuItems, entitiesReducers, uiReducers, history,
};
