import autobind from 'autobind-decorator';
import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { Beer } from '../../api/types';
import Button from '../../components/Button';
import { RENDER_COUNT_PER_REQUEST } from '../../lib/constants';
import BeerListActions from '../../redux/beerList/actions';
import { RootState } from '../../redux/types';

import ItemCard from './ItemCard';

const RenderMoreButtonWrapper = styled.div`
  text-align: center;
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
            <Button label="더보기 +" onClick={this.handleRenderMoreClick} />
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
  const { beerList } = state;
  const { cursor } = beerList;
  const hasMoreItemToRender = cursor < (beerList.beerIds.length as number);
  const beersArray = _(beerList.beerIds)
    .map((id) => beerList.beers[id])
    .take(cursor)
    .value();

  return {
    beersArray,
    hasMoreItemToRender
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  beerListBoundActions: bindActionCreators(BeerListActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerListContainer);
