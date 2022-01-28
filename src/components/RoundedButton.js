import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';

export const RoundedButton = ({
    style = {},
    textStyle = {},
    size = 125,
    title = 'T',
    onPress = () => {},
    ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[style,styles(size).radius]}>
      <Text style={[styles(size).text,textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = (size) => StyleSheet.create({
    radius: {
        borderWidth: 2,
        borderColor: colors.white,
        borderRadius: size/2,
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: colors.white,
        fontSize: size/3
    }
})