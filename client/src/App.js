import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { NavBar } from './components';
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
      <Router history={history}>
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
      </Router>
    </Layout>
  );
}

export default App;
