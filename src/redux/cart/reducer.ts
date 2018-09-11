import { createReducer } from '../utils';

import CartActions, { CartActionTypes } from './actions';
import { CartState } from './types';

export const initialState: CartState = {
  addedBeerIds: [],
  addedBeers: {}
};

function clearCart(state: CartState, action: Action<typeof CartActions.clearCart>) {
  return {
    ...state,
    addedBeerIds: [],
    addedBeers: {}
  };
}

export default createReducer(
  {
    [CartActionTypes.ClearCart]: clearCart
  },
  initialState
);
