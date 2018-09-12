import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { Beer } from '../../api/types';
import { RootState } from '../../redux/types';
import ItemCard from '../BeerListContainer/ItemCard';

import EmptyCart from './EmptyCart';

interface BeerWithCount extends Beer {
  count: number;
}

interface CartContainerProps {
  addedBeerIds: number[];
  addedBeersArray: BeerWithCount[];
}

class CartContainer extends React.Component<CartContainerProps> {
  public render() {
    const { addedBeerIds, addedBeersArray } = this.props;
    const isCartEmpty = _.isEmpty(addedBeerIds);

    return (
      <div>
        {isCartEmpty ? (
          <EmptyCart />
        ) : (
          <div>
            {addedBeersArray.map((beer) => (
              <ItemCard key={beer.id} {...beer} removeButtonLabel="취소" />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { cart, beerList } = state;
  const addedBeersArray: BeerWithCount[] = cart.addedBeerIds.map((id) => {
    const beer = beerList.beers[id] as BeerWithCount;
    beer.count = cart.addedBeersCount[id];
    return beer;
  });
  return {
    addedBeerIds: cart.addedBeerIds,
    addedBeersArray
  };
};

export default connect(
  mapStateToProps,
  null
)(CartContainer);
