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

interface ItemCardProps extends Partial<Beer> {
  count?: number;
  addedBeersCount: { [beerId: string]: number };
  cartBoundActions: typeof CartActions;
}

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
}

const Span = styled.span`
  margin-right: 1px;
  vertical-align: middle;
  color: ${(props: TextProps) => props.color || ''};
  font-weight: ${(props: TextProps) => props.fontWeight || ''};
  font-size: ${(props: TextProps) => props.fontSize || ''};
`;

const ButtonWrapper = styled.div`
  float: right;
`;

class ItemCard extends React.Component<ItemCardProps> {
  public render() {
    const { id, image, name, tags, price, stock, addedBeersCount } = this.props;
    const currentCount = addedBeersCount[id as number];
    const isAddedToCart = _.isInteger(currentCount) && currentCount > 0;
    return (
      <ItemCardContainer key={id}>
        <ItemImage src={image} />
        <ItemText>
          <Span fontSize="18px">{name}</Span>
        </ItemText>
        <ItemText>
          <Span color="#95959e">{_.map(tags, 'name').join(', ')}</Span>
        </ItemText>
        <ItemText>
          <Span color="#768399" fontSize="16px" fontWeight="bold">
            {price}
          </Span>
          <Span>원</Span>
        </ItemText>
        <ItemText>
          <Span color="#6E6E78" fontSize="14px" fontWeight="light">
            재고
          </Span>
          <Span color="#3C3C42" fontSize="14px" fontWeight="light">
            {stock}
          </Span>
        </ItemText>
        <ButtonWrapper>
          {isAddedToCart && (
            <Button label="빼기" border="0" onClick={this.handleRemoveFromCartClick} />
          )}
          <Button label="담기" primary border="0" onClick={this.handleAddToCartClick} />
        </ButtonWrapper>
      </ItemCardContainer>
    );
  }

  @autobind
  private handleRemoveFromCartClick() {
    const { id } = this.props;
    this.props.cartBoundActions.removeItemFromCart(id as number);
  }

  @autobind
  private handleAddToCartClick() {
    const { id } = this.props;
    this.props.cartBoundActions.addItemToCart(id as number);
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
