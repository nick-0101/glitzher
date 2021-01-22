import React from 'react';
import '../../App.css';
// import { AppContext } from "../Context/Context";
import { Layout, Menu, Input } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Header } = Layout;

const NavBar = () => {
    // const { toggleDisplay } = useContext(AppContext);

    // const handleToggleChange = (e) => {
    //   toggleDisplay();
    // };

  return (
    <>
      <Layout theme='light'>
        <Header theme='light' style={{ background: '#fff' }} >
          <div className='logo' />
          Price Flame 
          <Menu
            mode='horizontal'
            defaultSelectedKeys={['1']}
            style={{ float: 'right' }}
            theme='light'
          >
            <Menu.Item key='1'><ShoppingCartOutlined style={{fontSize: '24px'}} /></Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </>
  );
}

export default NavBar;
