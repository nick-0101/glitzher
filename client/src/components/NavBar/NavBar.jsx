import React from 'react';

// Antd
import { Layout, Menu } from 'antd';

// Css
import '../../App.css';
import './Navbar.css';


const { Header } = Layout;

const NavBar = () => {
  return (
    <>
      <Layout theme='light'>
        <Header theme='light' style={{ background: '#fff' }} >
          <div className='logo' />
          Price Flame 
          <Menu
            mode='horizontal'
            style={{ float: 'right'}} // margin: '0 20px', padding: '20px'
            theme='light'
          >
          </Menu>
        </Header>
      </Layout>
    </>
  );
}

export default NavBar;
