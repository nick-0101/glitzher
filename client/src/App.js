import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar, SubNav, FooterBar, Error } from './components';
import { Layout } from 'antd';
import './App.css';

// Pages
import { Homepage, PriceComparison, Tos } from './pages';

// History
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const { Content } = Layout;

function App() {
  return (
    <Router history={history}>
      <Content style={{ background: '#fff' }}>
        <div className='page-container'>
          <div className='content-wrap'>
            <Switch>
              <Route
                path='/'
                exact
                render={() => (
                  <>
                    <NavBar />
                    <Homepage />
                  </>
                )}
              />
              <Route
                path='/search'
                render={() => (
                  <>
                    <SubNav />
                    <PriceComparison />
                  </>
                )}
              />
              <Route
                path='/tos'
                render={() => (
                  <>
                    <NavBar />
                    <Tos />
                  </>
                )}
              />
              <Route
                path='*'
                render={() => (
                  <>
                    <NavBar />
                    <Error />
                  </>
                )}
              />
            </Switch>
          </div>
          <FooterBar />
        </div>
      </Content>
    </Router>
  );
}

export default App;
