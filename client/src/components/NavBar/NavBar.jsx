import React, { useContext } from 'react';
import '../../App.css';
import { AppContext } from "../Context/Context";
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

const NavBar = () => {
    const { toggleDisplay } = useContext(AppContext);

    const handleToggleChange = (e) => {
      toggleDisplay();
    };

  return (
    <div className='App'>
      <Layout theme='light'>
        <Header theme='light' style={{ background: '#fff' }}>
          <div className='logo' />
          Price Flame 
          <Menu
            mode='horizontal'
            defaultSelectedKeys={['1']}
            style={{ float: 'right' }}
            theme='light'
          >
            <Menu.Item key='1'>Home</Menu.Item>
            <Menu.Item key='2'>Account</Menu.Item>
            <Menu.Item key='3'>Settings</Menu.Item>
            <Menu.Item style={{ padding: 0, textAlign: 'center' }}>
              {React.createElement(MenuOutlined, {
                className: 'trigger',
                onClick: handleToggleChange,
              })}
            </Menu.Item>
          </Menu>
        </Header>
        {/* <Layout>
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
              <SubMenu key='sub1' icon={<UserOutlined />} title='subnav 1'>
                <Menu.Item key='1'>option1</Menu.Item>
                <Menu.Item key='2'>option2</Menu.Item>
                <Menu.Item key='3'>option3</Menu.Item>
                <Menu.Item key='4'>option4</Menu.Item>
              </SubMenu>
              <SubMenu key='sub2' icon={<LaptopOutlined />} title='subnav 2'>
                <Menu.Item key='5'>option5</Menu.Item>
                <Menu.Item key='6'>option6</Menu.Item>
                <Menu.Item key='7'>option7</Menu.Item>
                <Menu.Item key='8'>option8</Menu.Item>
              </SubMenu>
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

          <Layout style={{ padding: '24px' }}>
            <Content
              className='site-layout-background'
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout> */}
      </Layout>
    </div>
  );
}

export default NavBar;
