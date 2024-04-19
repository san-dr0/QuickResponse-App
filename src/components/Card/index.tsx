import React from 'react';
import * as S from './style';

type CardComponentProps = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  margin?: string;
};

export const CardComponent = (props: CardComponentProps) => {
  const {
    children,
    width,
    height,
    backgroundColor,
    padding,
    borderRadius,
    margin,
  } = props;

  return (
    <S.CardContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      padding={padding}
      borderRadius={borderRadius}
      margin={margin}>
      {children}
    </S.CardContainer>
  );
};
