import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NavBar, SubNav, Error } from './components';
import { Layout } from 'antd';
import './App.css';

// Pages
import { Homepage, PriceComparison } from './pages';

// History
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const { Content } = Layout;

let urlElements = window.location.href.split('/');

console.log(urlElements);
function App() {
  return (
    <Layout style={{ height: 'auto' }}>
      <BrowserRouter history={history}>
        <Layout>
          <Content style={{ background: '#fff' }}>
            <Switch>
              <Route
                path='/'
                exact
                render={(props) => (
                  <>
                    <NavBar /> <Homepage />
                  </>
                )}
              />
              <Route
                path='/search'
                render={(props) => (
                  <>
                    <SubNav />
                    <PriceComparison />
                  </>
                )}
              />
              <Route
                path='*'
                render={(props) => (
                  <>
                    <NavBar />
                    <Error />
                  </>
                )}
              />
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
