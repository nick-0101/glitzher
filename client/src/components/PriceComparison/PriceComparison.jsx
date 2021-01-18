import React from 'react';
import '../../App.css'
import { Layout, Typography, Input } from 'antd';

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const PriceComparison = () => {
    return (
      <Layout style={{ padding: '24px', textAlign: 'center', height: '90vh'}}>
          <Content
            style={{
              margin: '0 10%',
              minHeight: 280,
            }}
          >
            <Title>Price Comparison</Title>
            {/* add 'loading' when loading */}
            <Search placeholder="Enter a product title" enterButton="Search" size="large" />
          </Content>
      </Layout>
    );
}

export default PriceComparison;
