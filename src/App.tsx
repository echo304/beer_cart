import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';

import SiteNavagationContainer from './containers/SiteNavagationContainer';
import routes from './routes';

class App extends React.Component {
  public render() {
    return (
      <div>
        <SiteNavagationContainer />
        <div>
          <Switch>
            {routes.map((route) => (
              <Route path={route.path} component={route.component} key={route.path} />
            ))}
            <Redirect to="/list" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
