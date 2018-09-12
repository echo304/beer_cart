import autobind from 'autobind-decorator';
import React from 'react';
import styled, { css } from 'styled-components';

const primaryStyle = css`
  color: #fff;
  background: #3369e8;
`;

const transparentPrimaryStyle = css`
  color: #3369e8;
  background: transparent;
`;

const StyledButton = styled.button`
  ${(props) => props.primary && primaryStyle};
  ${(props) => props.transparentPrimary && transparentPrimaryStyle};
  ${(props: StyledButtonProps) =>
    props.width &&
    css`
      width: ${props.width};
    `};
  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `};
  ${(props) =>
    props.minWidth &&
    css`
      min-width: ${props.minWidth};
    `};
  ${(props) =>
    props.border &&
    css`
      border: ${props.border};
    `};
  padding: 6px 15px;
  margin-left: auto;
  border-radius: 4px;

  font-size: ${(props) => props.fontSize || '13px'};

  cursor: pointer;
  transform: translateY(0);
  transition: all 0.25s ease;

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: auto;
    opacity: 0.5;
    transform: translateY(0);
  }
`;

interface StyledButtonProps {
  primary?: boolean;
  transparentPrimary?: boolean;
  width?: string;
  height?: string;
  minWidth?: string;
  border?: string;
  fontSize?: string;
  nowrap?: boolean;
}

export interface ButtonProps extends StyledButtonProps {
  id?: string;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

class Button extends React.Component<ButtonProps> {
  public static defaultProps: Partial<ButtonProps> = {
    height: '30px'
  };

  public render() {
    const {
      id,
      primary,
      transparentPrimary,
      width,
      height,
      minWidth,
      fontSize,
      disabled,
      label,
      border
    } = this.props;
    return (
      <StyledButton
        id={id}
        primary={primary}
        transparentPrimary={transparentPrimary}
        width={width}
        height={height}
        minWidth={minWidth}
        border={border}
        fontSize={fontSize}
        onClick={this.handleClick}
        disabled={disabled}
      >
        {label}
      </StyledButton>
    );
  }

  @autobind
  private handleClick() {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }
}

export default Button;
