import React from 'react';
// import { AppContext } from "../Context/Context";
// import { Link } from 'react-router-dom';
import { Layout, Menu, Checkbox, Rate } from 'antd';

import {
  TagsTwoTone,
  UserOutlined,
  StarTwoTone
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderNav = () => {

    return (
    <Sider
      // style={{
      //   overflow: 'auto',
      //   height: '100vh',
      //   position: 'fixed',
      //   left: 20,
      //   background: '#fff'
      // }}
    >
      <Menu
        mode='inline'
        style={{ height: '100%', border: 'none', padding: '0 0 0 10%'}}
        defaultOpenKeys={['sub1', 'sub2']}
      >
        {/* Shipping */}
        <SubMenu key='sub1' icon={<UserOutlined />} title='Shipping'>
          <Menu.Item key='1'>
            <Checkbox>Fast Shipping</Checkbox>
          </Menu.Item>
        </SubMenu>

        {/* Discounts */}
        <SubMenu
          key='sub2'
          icon={<TagsTwoTone twoToneColor="#cf1322"/>}
          title='Discounts'
        >
          <Menu.Item key='2'>
            <Checkbox>under 20%</Checkbox>
          </Menu.Item>
          <Menu.Item key='3'>
            <Checkbox>20% to 40%</Checkbox>
          </Menu.Item>
          <Menu.Item key='4'>
            <Checkbox>Over 50%</Checkbox>
          </Menu.Item>
        </SubMenu>

        {/* Price Range */}
        <SubMenu
          key='sub2'
          icon={<StarTwoTone twoToneColor="#cf1322"/>}
          title='Price Range'
        >
          <Menu.Item key='5'>
            
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
    )
}

export default SiderNav;