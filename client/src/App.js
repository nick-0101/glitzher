import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NavBar, PriceComparison } from './components';
import { Layout } from 'antd';

// Pages
import { Homepage } from './pages';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ height: 'auto' }}>
      <BrowserRouter>
        <NavBar />
        <Layout>
          {/* <SiderNav /> */}
          <Content style={{ background: '#fff' }}>
            <Route path='/' exact render={(props) => <Homepage />} />
            <Switch>
              <Route
                path='/price-comparison'
                exact
                render={(props) => <PriceComparison />}
              />
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
