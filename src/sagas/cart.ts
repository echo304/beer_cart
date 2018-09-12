import _ from 'lodash';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../api';
import { Purchase, PurchaseSuccess } from '../api/types';
import BeerListActions from '../redux/beerList/actions';
import CartActions, { CartActionTypes } from '../redux/cart/actions';
import { RootState } from '../redux/types';

export function* handleCheckoutItems(action: Action<typeof BeerListActions.fetchBeers>) {
  const cart = yield select((state: RootState) => state.cart);
  const purchases: Purchase[] = _.map(cart.addedBeersCount, (count, id) => {
    return {
      id: parseInt(id, 10),
      count
    };
  });
  try {
    console.log('-------------------------------------');
    console.log(`Submitting purchase request`);
    console.log(`Items you are purchasing...`);
    purchases.forEach((purchase) => {
      console.log(`ID: ${purchase.id} - Count: ${purchase.count}`);
    });
    console.log('-------------------------------------');
    const purchaseResult: PurchaseSuccess = yield call(api.purchase.post, purchases);
    yield put(CartActions.clearCart());
    console.log('-------------------------------------');
    console.log(`Purchase request success`);
    console.log(`Total Item you purchased: ${purchaseResult.totalCount}`);
    console.log(`Total Price you purchased: ${purchaseResult.totalPrice}`);
    console.log('**Be Noted that this returning data is FAKE!!**');
    console.log('-------------------------------------');
    yield put(BeerListActions.fetchBeers());
  } catch (e) {
    console.error(e);
  }
}

export default function* cartSaga() {
  yield takeLatest(CartActionTypes.CheckoutItems, handleCheckoutItems);
}
