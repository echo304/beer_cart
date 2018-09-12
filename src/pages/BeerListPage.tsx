import * as React from 'react';

import BeerListContainer from '../containers/BeerListContainer';
import FiltersContainer from '../containers/FiltersContainer';

class BeerListPage extends React.Component {
  public render() {
    return (
      <div>
        <FiltersContainer />
        <BeerListContainer />
      </div>
    );
  }
}

export default BeerListPage;
