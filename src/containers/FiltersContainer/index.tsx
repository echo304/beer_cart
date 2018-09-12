import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '../../components/Button';
import { SelectableTag } from '../../redux/beerList/types';
import { RootState } from '../../redux/types';

const FiltersGroup = styled.div`
  display: flex;
  padding: 10px 10px 0;
  overflow-x: auto;
`;

const FilterWrapper = styled.div`
  flex: 0 0 auto;
`;

interface FiltersContainerProps {
  filters: SelectableTag[];
}

class FiltersContainer extends React.Component<FiltersContainerProps> {
  public render() {
    const { filters } = this.props;

    return (
      <FiltersGroup>
        {filters.map((filter) => (
          <FilterWrapper>
            <Button primary label={filter.name} key={filter.key} />
          </FilterWrapper>
        ))}
      </FiltersGroup>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { filters } = state.beerList;
  return {
    filters
  };
};

export default connect(
  mapStateToProps,
  null
)(FiltersContainer);
