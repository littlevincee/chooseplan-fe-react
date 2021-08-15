import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
import {  Switch, Route } from 'react-router-dom';
import Home from '../../../modules/home/home';
import Plan from '../../../modules/plan/plan';
import { useHistory } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const SideNavbar = () => {
  let history = useHistory();

  const [isCollapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const onClick = event => {
    const { key } = event;

    switch (key){
      case 'plan':
        history.push('/plan');
        break;
      default:
        history.push('/');
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={isCollapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="home" icon={<HomeOutlined />} onClick={onClick}>
            Home
          </Menu.Item>
          <Menu.Item key="plan" icon={<MedicineBoxOutlined />} onClick={onClick}>
            Plan
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            <Route component={Home} exact path="/" />
            <Route component={Plan} exact path="/plan" />
          </Switch>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div> */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default SideNavbar;