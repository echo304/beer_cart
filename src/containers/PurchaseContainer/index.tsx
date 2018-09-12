import autobind from 'autobind-decorator';
import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { Beer } from '../../api/types';
import Button from '../../components/Button';
import StylableText from '../../components/StylableText';
import { formatCurrency } from '../../lib/formatters';
import { colors, FontSize } from '../../lib/styles';
import CartActions from '../../redux/cart/actions';
import { RootState } from '../../redux/types';

const RightAlignContainer = styled.div`
  text-align: right;
`;

const ItemText = styled.div`
  margin-bottom: 4px;
`;

const Container = styled.div`
  margin: 20px 10px;
`;

interface BeerWithCount extends Beer {
  count: number;
}

interface PurchaseContainerProps {
  addedBeerIds: number[];
  addedBeersArray: BeerWithCount[];
  cartBoundActions: typeof CartActions;
}

class PurchaseContainer extends React.Component<PurchaseContainerProps> {
  public render() {
    const { addedBeerIds, addedBeersArray } = this.props;
    const isCartEmpty = _.isEmpty(addedBeerIds);
    const totalCount = addedBeersArray.reduce((sum, beerWithCount) => sum + beerWithCount.count, 0);
    const totalAmount = addedBeersArray.reduce((sum, beerWithCount) => {
      return sum + beerWithCount.count * beerWithCount.price;
    }, 0);

    if (isCartEmpty) {
      return null;
    }
    return (
      <Container>
        <RightAlignContainer>
          <ItemText>
            <StylableText color={colors.gray} fontSize={FontSize.Large}>
              총 구매수량 {totalCount} 개
            </StylableText>
          </ItemText>
          <ItemText>
            <StylableText color={colors.gray} fontSize={FontSize.Large}>
              총 결재금액 {formatCurrency(totalAmount)} 원
            </StylableText>
          </ItemText>
        </RightAlignContainer>
        <Button
          label="구매하기"
          primary
          width="100%"
          height="50px"
          onClick={this.handlePurchaseClick}
        />
      </Container>
    );
  }

  @autobind
  private handlePurchaseClick() {
    this.props.cartBoundActions.checkoutItems();
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

const mapDispatchToProps = (dispatch: any) => ({
  cartBoundActions: bindActionCreators(CartActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseContainer);
