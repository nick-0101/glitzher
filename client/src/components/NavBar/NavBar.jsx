import React from 'react';
import '../../App.css';
import { Layout, Menu } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Header } = Layout;

const NavBar = () => {
  return (
    <>
      <Layout theme='light'>
        <Header theme='light' style={{ background: '#fff' }} >
          <div className='logo' />
          Price Flame 
          <Menu
            // mode='horizontal'
            style={{ float: 'right'}}
            theme='light'
          >
            <Menu.Item key='1'>
              <ShoppingCartOutlined style={{fontSize: '24px',  verticalAlign: 'middle', border:0}} />
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </>
  );
}

export default NavBar;
