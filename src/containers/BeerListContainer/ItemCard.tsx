import autobind from 'autobind-decorator';
import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { Beer } from '../../api/types';
import Button from '../../components/Button';
import CartActions from '../../redux/cart/actions';
import { RootState } from '../../redux/types';

const ItemCardContainer = styled.div`
  height: 144px;
  margin: 8px 10px;
  padding: 12px;
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
  margin-right: 10px;
  border: 1px solid #ebebed;
  float: left;
`;

const ItemText = styled.div`
  margin-bottom: 4px;
`;

interface TextProps {
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  marginRight?: string;
}

const StylableSpan = styled.span`
  margin-right: ${(props: TextProps) => props.marginRight || '1px'};
  vertical-align: middle;
  color: ${(props: TextProps) => props.color || ''};
  font-weight: ${(props: TextProps) => props.fontWeight || ''};
  font-size: ${(props: TextProps) => props.fontSize || ''};
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
          <StylableSpan fontSize="18px">{name}</StylableSpan>
        </ItemText>
        <ItemText>
          <StylableSpan color="#95959e">{tagNames}</StylableSpan>
        </ItemText>
        <ItemText>
          <StylableSpan color="#768399" fontSize="16px" fontWeight="bold">
            {price}
          </StylableSpan>
          <StylableSpan>원</StylableSpan>
        </ItemText>
        <ItemText>
          {showStock && (
            <>
              <StylableSpan color="#6E6E78" fontSize="14px" fontWeight="light">
                재고
              </StylableSpan>
              <StylableSpan color="#3C3C42" fontSize="14px" fontWeight="light" marginRight="5px">
                {stock}
              </StylableSpan>
            </>
          )}
          {isAddedToCart && (
            <>
              <StylableSpan color="#6E6E78" fontSize="14px" fontWeight="light">
                수량
              </StylableSpan>
              <StylableSpan color="#3C3C42" fontSize="14px" fontWeight="light">
                {currentCount}
              </StylableSpan>
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
