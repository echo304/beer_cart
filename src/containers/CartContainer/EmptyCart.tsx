import * as React from 'react';
import styled from 'styled-components';

import EmptyCartSvg from '../../../assets/img-empty-cart.svg';
import Button from '../../components/Button';

const CenterAlignContainer = styled.div`
  text-align: center;
`;

class EmptyCart extends React.PureComponent {
  public render() {
    return (
      <CenterAlignContainer>
        <img src={EmptyCartSvg} />
        <div>카트가 비었습니다</div>
        <div>목록에서 원하는 맥주를 카트에 담아보세요.</div>
        <Button label="목록으로 가기" width="200px" primary />
      </CenterAlignContainer>
    );
  }
}

export default EmptyCart;
