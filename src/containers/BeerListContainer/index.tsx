import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { Beer } from '../../api/types';
import BeerListActions from '../../redux/beerList/actions';
import { RootState } from '../../redux/types';

interface BeerListContainerProps {
  beersArray: Beer[];
  beerListBoundActions: typeof BeerListActions;
}

const ItemCard = styled.div`
  margin: 8px 10px;
  padding: 5px;
  background-color: #fff;
  ::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const ItemImage = styled.img`
  width: 56px;
  height: 81px;
  border: 1px solid #ebebed;
  float: left;
`;

class BeerListContainer extends React.Component<BeerListContainerProps> {
  public componentWillMount() {
    this.fetchBeers();
  }

  public render() {
    const { beersArray } = this.props;
    return (
      <div>
        {beersArray.map(({ id, image, name, tags, price, stock }) => (
          <ItemCard key={id}>
            <ItemImage src={image} />
            <div>{name}</div>
            <div>{_.map(tags, 'name')}</div>
            <div>{price}원</div>
            <div>재고: {stock}</div>
          </ItemCard>
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
