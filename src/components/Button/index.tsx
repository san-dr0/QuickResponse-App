import React, {useMemo} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  background?: string;
  type?: string;
};

export default function Button(props: Props) {
  const {type = 'SOLID', background = 'red'} = props;
  const buttonStyle = useMemo(() => {
    if (type === 'SOLID') {
      return {
        button: {
          backgroundColor: background,
        },
        text: {
          color: 'white',
        },
      };
    }

    return {
      button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red',
      },
      text: {
        color: background,
      },
    };
  }, [props]);

  return (
    <TouchableOpacity style={{...buttonStyle.button, ...styles.buttonStyle}}>
      <Text style={{...buttonStyle.text, ...styles.text}}>HI</Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
  },
});
