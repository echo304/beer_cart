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
        {filters.map(({ key, name, selected }) => (
          <FilterWrapper key={key}>
            <Button
              primary={selected}
              transparentPrimary={!selected}
              label={name}
              key={key}
              onClick={() => this.handleFilterClick(key)}
            />
          </FilterWrapper>
        ))}
      </FiltersGroup>
    );
  }

  private handleFilterClick(key: string) {
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
