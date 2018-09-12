import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Button from '../../components/Button';
import BeerListActions from '../../redux/beerList/actions';
import { SelectableTag } from '../../redux/beerList/types';
import { RootState } from '../../redux/types';

const FiltersGroup = styled.div`
  display: flex;
  padding: 10px 10px 0;
  overflow-x: auto;
`;

const FilterWrapper = styled.div`
  flex: 0 0 auto;
  margin-right: 3px;
`;

interface FiltersContainerProps {
  filters: SelectableTag[];
  beerListBoundActions: typeof BeerListActions;
}

class FiltersContainer extends React.Component<FiltersContainerProps> {
  public render() {
    const { filters } = this.props;

    return (
      <FiltersGroup>
        {filters.map((filter) => (
          <FilterWrapper key={filter.key}>
            {filter.selected ? (
              <Button
                primary
                label={filter.name}
                key={filter.key}
                onClick={() => this.handleFilterClick(filter.key)}
              />
            ) : (
              <Button
                transparentPrimary
                label={filter.name}
                key={filter.key}
                onClick={() => this.handleFilterClick(filter.key)}
              />
            )}
          </FilterWrapper>
        ))}
      </FiltersGroup>
    );
  }

  private handleFilterClick(key: string) {
    console.log('value', key);
    this.props.beerListBoundActions.toggleFilter(key);
  }
}

const mapStateToProps = (state: RootState) => {
  const { filters } = state.beerList;
  return {
    filters
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  beerListBoundActions: bindActionCreators(BeerListActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersContainer);
