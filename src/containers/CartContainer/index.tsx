import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { BeerWithCount } from '../../redux/beerList/types';
import { RootState } from '../../redux/types';
import CartSelectors from '../../selectors/cart';
import ItemCard from '../BeerListContainer/ItemCard';

import EmptyCart from './EmptyCart';

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
  return {
    addedBeerIds: CartSelectors.addedBeerIdsSelector(state),
    addedBeersArray: CartSelectors.addedBeersArraySelector(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(CartContainer);
