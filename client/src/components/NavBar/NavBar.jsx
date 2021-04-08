import React from 'react';

// Antd
import { Layout, Menu } from 'antd';

// Css
import '../../App.css';
import './Navbar.css';
import logo from './images/logo.webp' 

const { Header } = Layout;

const NavBar = () => {
  return (
    <>
      <Layout theme='light'>
        <Header theme='light' style={{ background: '#fff' }}>
          <a href='/'>
            <img className='logo' src={logo} width="auto" height="auto" alt='Glitzher logo'/>
          </a>
          <Menu
            // mode='horizontal'
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
