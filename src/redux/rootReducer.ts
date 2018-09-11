import { combineReducers } from 'redux';

import beerList from './beerList/reducer';
import { RootState } from './types';

export default combineReducers<RootState>({
  beerList
});
