import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Icon, Menu } from 'antd';
import {
  defaultTo, T, cond, path,
} from 'ramda';

import { url } from '../../constants';
import commonMessages from '../commonMessages';
import { history } from '../history';

import './NavigationMenu.less';

/**
 * SubMenu example:
 * {
    url: url.PLATFORM,
    icon: 'api',
    message: commonMessages.pagePlatform,
    disabled: false,
    subMenu: [
      {
        url: url.HEALTH_CHECK,
        icon: 'medicine-box',
        message: commonMessages.pageHealthCheck,
        disabled: false,
      },
    ],
  },
 */
export const menuItems = [
  {
    url: url.ROOT,
    icon: 'share-alt',
    message: commonMessages.pageCluster,
    disabled: false,
  },
  {
    url: url.TOPICS,
    icon: 'bars',
    message: commonMessages.pageTopics,
    disabled: false,
  },
  {
    url: url.PRODUCER,
    icon: 'message',
    message: commonMessages.pageProducer,
    disabled: false,
  },
  {
    url: url.STREAMS,
    icon: 'retweet',
    message: commonMessages.pageStreams,
    disabled: false,
  },
  {
    url: url.KAFKACONNECT,
    icon: 'retweet',
    message: commonMessages.pageKafkaConnect,
    disabled: false,
  },
];

const getOpenKeys = (pathname) => {
  const openKeys = [];

  menuItems.forEach((item) => {
    if (defaultTo([], item.subMenu).length) {
      item.subMenu.forEach((subItem) => {
        if (subItem.url === pathname) {
          openKeys.push(item.url);
        }
      });
    }
  });

  return openKeys;
};

const redirect = (pth) => {
  history.push(pth);
};

const location = () => history.location;

const NavigationMenu = ({ collapsed }) => (
  <div>
    <Menu
      className="navigation-menu"
      inlineCollapsed={collapsed}
      mode="inline"
      theme="dark"
      defaultOpenKeys={getOpenKeys(location.pathname)}
      defaultSelectedKeys={[location.pathname]}
      onClick={e => redirect(e.key)}
    >
      {
        menuItems.map(cond([
          [path(['subMenu']), item => (
            <Menu.SubMenu
              key={item.url}
              disabled={item.disabled}
              title={(
                <span>
                  <Icon type={item.icon} />
                  <FormattedMessage {...item.message} />
                </span>
)}
            >
              {
                item.subMenu.map(subItem => (
                  <Menu.Item key={subItem.url} disabled={subItem.disabled}>
                    <Icon type={subItem.icon} />
                    <FormattedMessage {...subItem.message} />
                  </Menu.Item>
                ))
              }
            </Menu.SubMenu>
          )],
          [path(['divider']), item => (<Menu.Divider key={item.key} />)],
          [T, item => (
            <Menu.Item key={item.url} disabled={item.disabled}>
              <Icon type={item.icon} />
              <FormattedMessage {...item.message} />
            </Menu.Item>
          )],
        ]))
      }
    </Menu>
  </div>
);

NavigationMenu.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default NavigationMenu;
