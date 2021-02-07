import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NavBar, Error } from './components';
import { Layout } from 'antd';

// Pages
import { Homepage, PriceComparison } from './pages';

// History
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ height: 'auto' }}>
      <BrowserRouter history={history}>
        <NavBar />
        <Layout>
          <Content style={{ background: '#fff' }}>
            <Switch>
              <Route path='/' exact render={(props) => <Homepage />} />
              <Route path='/search' render={(props) => <PriceComparison />} />
              <Route path='*' render={(props) => <Error />} />
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
