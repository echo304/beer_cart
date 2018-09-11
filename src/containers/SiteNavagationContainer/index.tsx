import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import CartSelectedSvg from '../../../assets/img-cart-selected.svg';
import CartSvg from '../../../assets/img-cart.svg';
import ListSelectedSvg from '../../../assets/img-list-selected.svg';
import ListSvg from '../../../assets/img-list.svg';

const NavBar = styled.nav`
  height: 52px;
  padding: 14px 18px;
  background-color: #fff;
`;

const Title = styled.span`
  font-size: 20px;
`;

const RightIconGroup = styled.div`
  float: right;
`;

const PaddedLink = styled(Link)`
  padding: 8px;
`;

class SiteNavigationContainer extends React.Component<RouteComponentProps<any>> {
  public render() {
    const { location } = this.props;
    const isOnList = location.pathname === '/list';
    const isOnCart = location.pathname === '/cart';
    return (
      <NavBar>
        <Title>맥주 담기</Title>
        <RightIconGroup>
          <PaddedLink to="/list">
            {isOnList ? <img src={ListSelectedSvg} /> : <img src={ListSvg} />}
          </PaddedLink>
          <PaddedLink to="/cart">
            {isOnCart ? <img src={CartSelectedSvg} /> : <img src={CartSvg} />}
          </PaddedLink>
        </RightIconGroup>
      </NavBar>
    );
  }
}

export default withRouter(SiteNavigationContainer);
