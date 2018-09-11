import * as React from 'react';
import { hot } from 'react-hot-loader';
import {
  NavLink,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom';

import CartSelectedSvg from '../assets/img-cart-selected.svg';
import CartSvg from '../assets/img-cart.svg';
import ListSelectedSvg from '../assets/img-list-selected.svg';
import ListSvg from '../assets/img-list.svg';

import routes from './routes';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    const { location } = this.props;
    const isOnList = location.pathname === '/list';
    const isOnCart = location.pathname === '/cart';
    return (
      <div>
        <nav>
          <NavLink to="/list">
            {isOnList ? <img src={ListSelectedSvg} /> : <img src={ListSvg} />}
          </NavLink>
          <NavLink to="/cart">
            {isOnCart ? <img src={CartSelectedSvg} /> : <img src={CartSvg} />}
          </NavLink>
        </nav>
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

export default hot(module)(withRouter(App));
