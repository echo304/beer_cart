import BeerListPage from './pages/BeerListPage';
import CartPage from './pages/CartPage';

interface RouteConfig {
  path: string;
  component: React.ComponentType;
}

const routes: RouteConfig[] = [
  {
    path: '/list',
    component: BeerListPage
  },
  {
    path: '/cart',
    component: CartPage
  }
];

export default routes;
