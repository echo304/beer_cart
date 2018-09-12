import * as React from 'react';

import CartContainer from '../containers/CartContainer';
import PurchaseContainer from '../containers/PurchaseContainer';

class CartPage extends React.Component {
  public render() {
    return (
      <div>
        <CartContainer />
        <PurchaseContainer />
      </div>
    );
  }
}

export default CartPage;
