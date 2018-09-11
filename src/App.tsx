import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import SiteNavagationContainer from './containers/SiteNavagationContainer';
import routes from './routes';

const SiteContent = styled.div`
  position: relative;
  top: 52px;
`;

class App extends React.Component {
  public render() {
    return (
      <div>
        <SiteNavagationContainer />
        <SiteContent>
          <Switch>
            {routes.map((route) => (
              <Route path={route.path} component={route.component} key={route.path} />
            ))}
            <Redirect to="/list" />
          </Switch>
        </SiteContent>
      </div>
    );
  }
}

export default hot(module)(App);
