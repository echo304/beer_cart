import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import EmptyCartSvg from '../../../assets/img-empty-cart.svg';
import Button from '../../components/Button';
import StylableText from '../../components/StylableText';
import { colors, FontSize } from '../../lib/styles';

const CenterAlignContainer = styled.div`
  padding-top: 80px;
  text-align: center;
`;

const ItemText = styled.div`
  margin: 10px;
`;

class EmptyCart extends React.PureComponent {
  public render() {
    return (
      <CenterAlignContainer>
        <img src={EmptyCartSvg} />
        <ItemText>
          <StylableText fontWeight="bold" fontSize={FontSize.Large} color={colors.lightGray}>
            카트가 비었습니다
          </StylableText>
        </ItemText>
        <ItemText>
          <StylableText fontSize={FontSize.Small} color={colors.gray}>
            <span>목록에서 원하는 맥주를</span>
            <br />
            <span>카트에 담아보세요.</span>
          </StylableText>
        </ItemText>
        <Link to="/list">
          <Button label="목록으로 가기" width="200px" primary />
        </Link>
      </CenterAlignContainer>
    );
  }
}

export default EmptyCart;
