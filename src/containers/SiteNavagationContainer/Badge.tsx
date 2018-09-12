import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../redux/types';

interface BadgeProps {
  totalCount: number;
}

const CircleBadge = styled.div`
  position: absolute;
  top: -9px;
  right: 0;
  border-radius: 18px;
  width: 18px;
  height: 18px;
  font-size: 10px;
  line-height: 20px;
  background: #ef5350;
  color: #fff;
  text-align: center;
`;

class Badge extends React.Component<BadgeProps> {
  public render() {
    const { totalCount } = this.props;
    if (totalCount === 0) {
      return null;
    }
    return <CircleBadge>{totalCount}</CircleBadge>;
  }
}

const mapStateToProps = (state: RootState) => {
  const MAX_NUMBER_TO_RENDER = 99;
  const { addedBeersCount } = state.cart;
  let totalCount = _.reduce(addedBeersCount, (sum, count) => sum + count, 0);
  totalCount = Math.min(MAX_NUMBER_TO_RENDER, totalCount);
  return {
    totalCount
  };
};

export default connect(
  mapStateToProps,
  null
)(Badge);
