import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import Footer from '../../containers/Footer';
import Header from '../../containers/Header';
import NavigationMenu from '../NavigationMenu';
import ScrollToTop from '../../containers/ScroolToTop';

import './App.less';

const { Content, Sider } = Layout;

const App = ({ children, collapsedMenu, toggleMenu }) => (
  <ScrollToTop>
    <Layout className="appLayout">
      <Sider
        collapsible
        onCollapse={toggleMenu}
      >
        <div className="logo" />
        <NavigationMenu collapsed={collapsedMenu} />
      </Sider>
      <Layout>
        <Header />
        <Content className="content">
          { children }
        </Content>
        <Footer />
      </Layout>
    </Layout>
  </ScrollToTop>
);

App.propTypes = {
  children: PropTypes.node,
  collapsedMenu: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

App.defaultProps = {
  children: <div />,
};

export default App;
