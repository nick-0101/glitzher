import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
    <BrowserRouter history={history}>
      <Content style={{ background: '#fff' }}>
        <Switch>
          <Route
            path='/'
            exact
            render={() => (
              <>
                <Homepage />
              </>
            )}
          />
          <div className='page-container'>
            <div className='content-wrap'>
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
            </div>
            <FooterBar />
          </div>
        </Switch>
      </Content>
    </BrowserRouter>
  );
}

export default App;
