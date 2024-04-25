import {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  background?: string;
  type?: string;
  title: string;
  onPress?: () => void;
  isDisable?: boolean;
};

export default function Button(props: Props) {
  const {type = 'SOLID', background = 'red', title, isDisable} = props;
  const buttonStyle = useMemo(() => {
    if (type === 'SOLID') {
      return {
        button: {
          backgroundColor: isDisable ? 'whitesmoke' : background,
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

  const handlePress = () => {
    if (!props.onPress) {
      return;
    }

    props.onPress();
  };

  return (
    <TouchableOpacity
      style={{...buttonStyle.button, ...styles.buttonStyle}}
      onPress={handlePress}
      disabled={isDisable}>
      <Text style={{...buttonStyle.text, ...styles.text}}>{title}</Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
});
