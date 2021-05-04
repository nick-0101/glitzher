import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { NavBar, SubNav, FooterBar, Error } from './components';
import { NavBar, FooterBar, Error } from './components';

import './App.css';
// import { Homepage, PriceComparison, Tos, Privacy } from './pages';
import { Tos, Privacy } from './pages';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

// const { Content } = Layout;

function usePageViews() {
  let location = window.location;
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize('UA-194144958-1');
      window.GA_INITIALIZED = true;
    }
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);
}

function App() {
  usePageViews();
  return (
    <Router history={history}>
      <div style={{ background: '#fff' }}>
        <div className='page-container'>
          <div className='content-wrap'>
            <Switch>
              {/* <Route
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
              /> */}
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
                path='/polices/privacy'
                render={() => (
                  <>
                    <NavBar />
                    <Privacy />
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
      </div>
    </Router>
  );
}

export default App;
