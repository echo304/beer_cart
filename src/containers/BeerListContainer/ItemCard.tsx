import autobind from 'autobind-decorator';
import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { Beer } from '../../api/types';
import Button from '../../components/Button';
import StylableText from '../../components/StylableText';
import { colors, FontSize } from '../../lib/styles';
import CartActions from '../../redux/cart/actions';
import { RootState } from '../../redux/types';

const ItemCardContainer = styled.div`
  height: 144px;
  margin: 8px 10px;
  padding: 12px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.37);
  ::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const ItemImage = styled.img`
  width: 56px;
  height: 81px;
  margin-right: 10px;
  border: 1px solid #ebebed;
  float: left;
`;

const ItemText = styled.div`
  margin-bottom: 4px;
`;

const ButtonGroup = styled.div`
  width: 110px;
  float: right;
  display: flex;
  justify-content: space-between;
`;

interface ItemCardProps extends Beer {
  count?: number;
  addedBeersCount: { [beerId: string]: number };
  showStock?: boolean;
  showAddButton?: boolean;
  addButtonLabel?: string;
  removeButtonLabel?: string;
  cartBoundActions: typeof CartActions;
}

class ItemCard extends React.Component<ItemCardProps> {
  public static defaultProps: Partial<ItemCardProps> = {
    addButtonLabel: '담기',
    removeButtonLabel: '빼기'
  };

  public render() {
    const {
      id,
      image,
      name,
      tags,
      price,
      stock,
      addedBeersCount,
      showStock,
      showAddButton,
      addButtonLabel,
      removeButtonLabel
    } = this.props;

    const tagNames = _.map(tags, 'name').join(', ');
    const currentCount = addedBeersCount[id];
    const isAddedToCart = _.isInteger(currentCount) && currentCount > 0;
    const isFullyAddedToCart = currentCount === stock;
    return (
      <ItemCardContainer key={id}>
        <ItemImage src={image} />
        <ItemText>
          <StylableText fontSize={FontSize.MediumLarge}>{name}</StylableText>
        </ItemText>
        <ItemText>
          <StylableText color={colors.gray}>{tagNames}</StylableText>
        </ItemText>
        <ItemText>
          <StylableText color={colors.blueGray} fontSize={FontSize.Medium} fontWeight="bold">
            {price}
          </StylableText>
          <StylableText>원</StylableText>
        </ItemText>
        <ItemText>
          {showStock && (
            <>
              <StylableText color={colors.lightGray} fontSize={FontSize.Small} fontWeight="light">
                재고
              </StylableText>
              <StylableText
                color={colors.darkGray}
                fontSize={FontSize.Small}
                fontWeight="light"
                marginRight="5px"
              >
                {stock}
              </StylableText>
            </>
          )}
          {isAddedToCart && (
            <>
              <StylableText color={colors.lightGray} fontSize={FontSize.Small} fontWeight="light">
                수량
              </StylableText>
              <StylableText color={colors.darkGray} fontSize={FontSize.Small} fontWeight="light">
                {currentCount}
              </StylableText>
            </>
          )}
        </ItemText>
        <ButtonGroup>
          {isAddedToCart && (
            <Button label={removeButtonLabel} border="0" onClick={this.handleRemoveFromCartClick} />
          )}
          {showAddButton && (
            <Button
              label={addButtonLabel}
              border="0"
              primary
              onClick={this.handleAddToCartClick}
              disabled={isFullyAddedToCart}
            />
          )}
        </ButtonGroup>
      </ItemCardContainer>
    );
  }

  @autobind
  private handleRemoveFromCartClick() {
    const { id } = this.props;
    this.props.cartBoundActions.removeItemFromCart(id);
  }

  @autobind
  private handleAddToCartClick() {
    const { id } = this.props;
    this.props.cartBoundActions.addItemToCart(id);
  }
}

const mapStateToProps = (state: RootState) => {
  const { addedBeersCount } = state.cart;
  return {
    addedBeersCount
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  cartBoundActions: bindActionCreators(CartActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCard);
