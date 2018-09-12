import autobind from 'autobind-decorator';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { Beer } from '../../api/types';
import { RENDER_COUNT_PER_REQUEST } from '../../lib/constants';
import { colors, FontSize } from '../../lib/styles';
import BeerListActions from '../../redux/beerList/actions';
import { RootState } from '../../redux/types';
import BeerListSelectors from '../../selectors/beerList';

import ItemCard from './ItemCard';

const RenderMoreButtonWrapper = styled.div`
  text-align: center;
  margin: 15px 0 30px 0;
`;

const StyledButton = styled.button`
  height: 40px;
  padding: 6px 15px;
  margin-left: auto;
  border-radius: 20px;
  background-color: #fff;
  color: ${colors.gray};
  font-size: ${FontSize.Medium};
  font-weight: bold;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.37);

  cursor: pointer;
  transform: translateY(0);
  transition: all 0.25s ease;

  &:active {
    transform: translateY(1px);
  }
`;

interface BeerListContainerProps {
  beersArray: Beer[];
  hasMoreItemToRender: boolean;
  beerListBoundActions: typeof BeerListActions;
}

class BeerListContainer extends React.Component<BeerListContainerProps> {
  public render() {
    const { beersArray, hasMoreItemToRender } = this.props;
    return (
      <div>
        {beersArray.map((beer) => (
          <ItemCard key={beer.id} {...beer} showAddButton showStock />
        ))}
        {hasMoreItemToRender && (
          <RenderMoreButtonWrapper>
            <StyledButton onClick={this.handleRenderMoreClick}>더보기 +</StyledButton>
          </RenderMoreButtonWrapper>
        )}
      </div>
    );
  }

  @autobind
  private handleRenderMoreClick() {
    const { beerListBoundActions } = this.props;
    beerListBoundActions.renderBeers(RENDER_COUNT_PER_REQUEST);
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    beersArray: BeerListSelectors.beersToBeRenderedSelector(state),
    hasMoreItemToRender: BeerListSelectors.hasMoreItemsToRenderSelector(state)
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  beerListBoundActions: bindActionCreators(BeerListActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerListContainer);
