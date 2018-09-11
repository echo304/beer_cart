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

interface LinkItem {
  path: string;
  icon: string;
  selectedIcon: string;
}

class SiteNavigationContainer extends React.Component<RouteComponentProps<any>> {
  private links: LinkItem[];

  constructor(props: RouteComponentProps<any>) {
    super(props);

    this.links = [
      {
        path: '/list',
        icon: ListSvg,
        selectedIcon: ListSelectedSvg
      },
      {
        path: '/cart',
        icon: CartSvg,
        selectedIcon: CartSelectedSvg
      }
    ];
  }
  public render() {
    const currentPath = this.props.location.pathname;
    return (
      <NavBar>
        <Title>맥주 담기</Title>
        <RightIconGroup>
          {this.links.map(({ path, icon, selectedIcon }) => (
            <PaddedLink to={path} key={path}>
              <img src={currentPath === path ? selectedIcon : icon} />
            </PaddedLink>
          ))}
        </RightIconGroup>
      </NavBar>
    );
  }
}

export default withRouter(SiteNavigationContainer);
