import React from 'react';
import {Image} from 'react-native';

type ImageComponentProps = {
  imageSrc: any;
  width?: number;
  height?: number;
  borderRadius?: number;
  isRemoteFile?: boolean;
};

export default function ImageComponent(props: ImageComponentProps) {
  const {borderRadius, imageSrc, width, height, isRemoteFile} = props;

  return isRemoteFile ? (
    <Image
      source={{uri: imageSrc}}
      width={width}
      height={height}
      borderRadius={borderRadius}
    />
  ) : (
    <Image
      source={imageSrc}
      borderRadius={borderRadius}
      style={{width: width, height: height}}
    />
  );
}
