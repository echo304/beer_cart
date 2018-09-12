import { combineReducers } from 'redux';

import beerList from './beerList/reducer';
import cart from './cart/reducer';
import { RootState } from './types';

export default combineReducers<RootState>({
  beerList,
  cart
});
