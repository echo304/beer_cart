import { Reducer } from 'redux';

export function createReducer<T>(
  actionReducers: { [action: string]: Reducer<T> },
  initialState: T
) {
  return (state = initialState, action: any) => {
    const type = action.type;
    const actionReducer = actionReducers[type];
    if (actionReducer) {
      return actionReducer(state, action);
    }
    return state;
  };
}
