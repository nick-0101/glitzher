import React from 'react';
import { Layout, Menu, Checkbox } from 'antd';

import {
  TagsTwoTone,
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderNav = () => {

    return (
      <>
      <Sider
        // style={{
        //   overflow: 'auto',
        //   height: '100vh',
        //   position: 'fixed',
        //   left: 20,
        //   background: '#fff'
        // }}
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
      >
        <Menu
          // mode='inline'
          style={{ height: '100vh', border: 'none', padding: '0'}}
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
          {/* <SubMenu
            key='sub3'
            icon={<StarTwoTone twoToneColor="#cf1322"/>}
            title='Price Range'
          >
          </SubMenu> */}
        </Menu>
      </Sider>
    </>
    )
}

export default SiderNav;