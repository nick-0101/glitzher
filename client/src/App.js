import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NavBar } from './components';
import { Layout } from 'antd';

// Pages
import { Homepage, PriceComparison } from './pages';

// History
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ height: 'auto' }}>
      <BrowserRouter history={history}>
        <NavBar />
        <Layout>
          {/* <SiderNav /> */}
          <Content style={{ background: '#fff' }}>
            <Switch>
              <Route path='/' exact render={(props) => <Homepage />} />
              <Route path='/search' render={(props) => <PriceComparison />} />
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
