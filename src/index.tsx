import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

function initReact() {
  const render = (AppComponent: typeof App) => {
    ReactDOM.render(
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>,
      document.getElementById('root') as HTMLElement
    );
  };
  render(App);
}

initReact();
