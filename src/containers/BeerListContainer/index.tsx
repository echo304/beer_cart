import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Beer } from '../../api/types';
import BeerListActions from '../../redux/beerList/actions';
import { RootState } from '../../redux/types';

import ItemCard from './ItemCard';

interface BeerListContainerProps {
  beersArray: Beer[];
  beerListBoundActions: typeof BeerListActions;
}

class BeerListContainer extends React.Component<BeerListContainerProps> {
  public componentWillMount() {
    this.fetchBeers();
  }

  public render() {
    const { beersArray } = this.props;
    return (
      <div>
        {beersArray.map((beer) => (
          <ItemCard key={beer.id} {...beer} />
        ))}
      </div>
    );
  }

  private fetchBeers() {
    const { beerListBoundActions } = this.props;
    beerListBoundActions.fetchBeers();
  }
}

const mapStateToProps = (state: RootState) => {
  const { beerList } = state;
  const beersArray = beerList.beerIds.map((id) => beerList.beers[id]);
  return {
    beersArray
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  beerListBoundActions: bindActionCreators(BeerListActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerListContainer);
