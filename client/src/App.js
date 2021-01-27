import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NavBar, ComparisonSearch } from './components';
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
            <Switch>
              <Route path='/' exact render={(props) => <Homepage />} />
              <Route path='/search' render={(props) => <ComparisonSearch />} />
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
