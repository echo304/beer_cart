import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './global.scss';

import ScrollToTop from './components/ScrollToTop';
import configureStore from './store/configureStore';

const store = configureStore();

function initReact() {
  const render = (AppComponent: typeof App) => {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <AppComponent />
          </ScrollToTop>
        </BrowserRouter>
      </Provider>,
      document.getElementById('root') as HTMLElement
    );
  };
  render(App);
}

initReact();
