import _ from 'lodash';

import { createReducer } from '../utils';

import CartActions, { CartActionTypes } from './actions';
import { CartState } from './types';

export const initialState: CartState = {
  addedBeerIds: [],
  addedBeersCount: {}
};

function addItemToCart(state: CartState, action: Action<typeof CartActions.addItemToCart>) {
  const { itemId } = action;
  let newAddedBeerIds = [...state.addedBeerIds];
  newAddedBeerIds.push(itemId);
  newAddedBeerIds = _.uniq(newAddedBeerIds);

  const newAddedBeersCount = { ...state.addedBeersCount };
  if (_.isInteger(newAddedBeersCount[itemId])) {
    newAddedBeersCount[itemId]++;
  } else {
    newAddedBeersCount[itemId] = 1;
  }

  return {
    ...state,
    addedBeerIds: newAddedBeerIds,
    addedBeersCount: newAddedBeersCount
  };
}

function removeItemFromCart(
  state: CartState,
  action: Action<typeof CartActions.removeItemFromCart>
) {
  const { itemId } = action;

  const newAddedBeersCount = { ...state.addedBeersCount };
  const currentCount = newAddedBeersCount[itemId];
  if (_.isInteger(currentCount) && currentCount > 0) {
    newAddedBeersCount[itemId]--;
  }

  const newAddedBeerIds =
    newAddedBeersCount[itemId] === 0
      ? _.without([...state.addedBeerIds], itemId)
      : [...state.addedBeerIds];

  return {
    ...state,
    addedBeerIds: newAddedBeerIds,
    addedBeersCount: newAddedBeersCount
  };
}

function clearCart(state: CartState, action: Action<typeof CartActions.clearCart>) {
  return {
    ...state,
    addedBeerIds: [],
    addedBeersCount: {}
  };
}

export default createReducer(
  {
    [CartActionTypes.ClearCart]: clearCart,
    [CartActionTypes.AddItemToCart]: addItemToCart,
    [CartActionTypes.RemoveItemFromCart]: removeItemFromCart
  },
  initialState
);
