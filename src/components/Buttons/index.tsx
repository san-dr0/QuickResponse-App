import React from 'react';
import * as S from './style';
import TextComponent from '../TextLabel';

type ButtonContainerProps = {
  title?: string;
  backgroundColor?: string;
  disabled?: boolean;
  textColor?: string;
  fontWeight?: string;
  fontSize?: number;
  textAlign?: string;
  margin?: string;
  alignSelf?: string;
  padding?: string;
  borderRadius?: string;
  width?: number;
  onPress?: () => void;
};

export const ButtonComponent = (props: ButtonContainerProps) => {
  const {
    title,
    backgroundColor,
    textColor,
    disabled,
    fontWeight,
    fontSize,
    textAlign,
    margin,
    alignSelf,
    padding,
    borderRadius,
    width,
    onPress,
  } = props;

  return (
    <S.ButtonContainer
      alignSelf={alignSelf}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      disabled={disabled}
      textColor={textColor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      margin={margin}
      width={width}
      onPress={onPress}
      padding={padding}>
      <TextComponent
        title={title}
        textAlign={textAlign}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textColor={textColor}
      />
    </S.ButtonContainer>
  );
};
