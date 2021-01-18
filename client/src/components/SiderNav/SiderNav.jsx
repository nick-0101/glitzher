import React, { useContext } from 'react';
import { AppContext } from "../Context/Context";
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  NotificationOutlined,
  UserOutlined,
  LineChartOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderNav = () => {
    const { isToggled } = useContext(AppContext);

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={false}
            width={!isToggled ? 200 : 0}
            className='site-layout-background'
          >
          <Menu
            mode='inline'
            defaultSelectedKeys={['0']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key='sub1' icon={<UserOutlined />} title='Categories'>
              <Menu.Item key='1'>option1</Menu.Item>
              <Menu.Item key='2'>option2</Menu.Item>
              <Menu.Item key='3'>option3</Menu.Item>
              <Menu.Item key='4'>option4</Menu.Item>
            </SubMenu>
            <Menu.Item key='sub2' icon={<LineChartOutlined />}>
              <Link to="/price-comparison">Price Comparison</Link>
            </Menu.Item>
            <SubMenu
              key='sub3'
              icon={<NotificationOutlined />}
              title='subnav 3'
            >
              <Menu.Item key='9'>option9</Menu.Item>
              <Menu.Item key='10'>option10</Menu.Item>
              <Menu.Item key='11'>option11</Menu.Item>
              <Menu.Item key='12'>option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
    )
}

export default SiderNav;