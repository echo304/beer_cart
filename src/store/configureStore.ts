import { Store } from 'redux';

let configureStore: () => Store<any>;

configureStore = require('./configureStore.dev').default;

export default configureStore;
