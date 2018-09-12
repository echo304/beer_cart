import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import CartSelectedSvg from '../../../assets/img-cart-selected.svg';
import CartSvg from '../../../assets/img-cart.svg';
import ListSelectedSvg from '../../../assets/img-list-selected.svg';
import ListSvg from '../../../assets/img-list.svg';
import { FontSize } from '../../lib/styles';
import BeerListActions from '../../redux/beerList/actions';

import Badge from './Badge';

const NavBar = styled.nav`
  position: fixed;
  height: 52px;
  width: 100%;
  top: 0;
  padding: 14px 18px;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.37);
`;

const Title = styled.span`
  font-size: ${FontSize.Large};
`;

const RightIconGroup = styled.div`
  float: right;
`;

const PaddedLink = styled(Link)`
  position: relative;
  padding: 8px;
`;

interface SiteNavigationContainerProps extends RouteComponentProps<any> {
  beerListBoundActions: typeof BeerListActions;
}

class SiteNavigationContainer extends React.Component<SiteNavigationContainerProps> {
  public componentDidMount() {
    // This is obviously anti pattern.
    // But I've added async task here for the project
    this.fetchBeers();
  }

  public render() {
    const currentPath = this.props.location.pathname;
    return (
      <NavBar>
        <Title>맥주 담기</Title>
        <RightIconGroup>
          <PaddedLink to={'/list'}>
            <img src={currentPath === '/list' ? ListSelectedSvg : ListSvg} />
          </PaddedLink>
          <PaddedLink to={'/cart'}>
            <img src={currentPath === '/cart' ? CartSelectedSvg : CartSvg} />
            <Badge />
          </PaddedLink>
        </RightIconGroup>
      </NavBar>
    );
  }

  private fetchBeers() {
    const { beerListBoundActions } = this.props;
    beerListBoundActions.fetchBeers();
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  beerListBoundActions: bindActionCreators(BeerListActions, dispatch)
});

const ConnectedComponent = connect(
  null,
  mapDispatchToProps
)(SiteNavigationContainer);

export default withRouter(ConnectedComponent);
