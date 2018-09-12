import styled from 'styled-components';

interface TextProps {
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  marginRight?: string;
}

const StylableText = styled.span`
  margin-right: ${(props: TextProps) => props.marginRight || '1px'};
  vertical-align: middle;
  color: ${(props: TextProps) => props.color || ''};
  font-weight: ${(props: TextProps) => props.fontWeight || ''};
  font-size: ${(props: TextProps) => props.fontSize || ''};
`;

export default StylableText;
