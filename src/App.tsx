import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Link, Route } from 'react-router-dom';

import routes from './routes';

class App extends React.Component {
  public render() {
    return (
      <div>
        <nav>
          <Link to="/list">list</Link>
          <Link to="/cart">cart</Link>
        </nav>
        <div>
          {routes.map((route) => (
            <Route path={route.path} component={route.component} key={route.path} />
          ))}
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
