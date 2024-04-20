import React, {ChangeEvent} from 'react';
import * as S from './style';
import TextInputEnum from '../../enums/TextInput.enum';
import {KeyboardTypeOptions} from 'react-native';
import {COLOR_LISTS} from '../../constants/colors';
import TextLabel from '../TextLabel';

type TextInputComponentProps = {
  label?: string;
  borderRadius?: number;
  textMode: TextInputEnum;
  textColor?: string;
  value?: string;
  height?: string;
  onChangeText?: (param: string | ChangeEvent<Element>) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  maxLength?: number;
  error?: string | undefined;
  multiline?: boolean;
  width?: string;
  align?: string;
};
export default function TextInputComponent(props: TextInputComponentProps) {
  const {
    label,
    borderRadius,
    textMode,
    textColor,
    value,
    height,
    onChangeText,
    secureTextEntry,
    keyboardType,
    disabled,
    maxLength,
    error,
    multiline,
    width,
    align
  } = props;

  return (
    <>
      <S.TextInputContainer
        label={label}
        borderRadius={borderRadius}
        value={value}
        mode={textMode}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ?? 'default'}
        height={height}
        disabled={disabled}
        textColor={textColor ?? COLOR_LISTS.BLACK}
        maxLength={maxLength}
        multiline={multiline}
        width={width}
        align={align}
      />
      {error && <TextLabel title={`${error}`} textColor={COLOR_LISTS.RED} />}
    </>
  );
}
