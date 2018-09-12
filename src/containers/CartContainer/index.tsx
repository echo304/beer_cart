import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import EmptyCartSvg from '../../../assets/img-empty-cart.svg';
import { Beer } from '../../api/types';
import Button from '../../components/Button';
import { RootState } from '../../redux/types';
import ItemCard from '../BeerListContainer/ItemCard';

const CenterAlignContainer = styled.div`
  text-align: center;
`;

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
          <CenterAlignContainer>
            <img src={EmptyCartSvg} />
            <div>카트가 비었습니다</div>
            <div>목록에서 원하는 맥주를 카트에 담아보세요.</div>
            <Button label="목록으로 가기" width="200px" primary />
          </CenterAlignContainer>
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
