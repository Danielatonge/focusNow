import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

export const Focus = ({ addSubject }) => {
  const [input, setInput] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}> What would you like to focus on?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={value => {
            setInput(value);
          }}
          style={styles.inputField}
        />
        <RoundedButton
          onPress={() => {
            addSubject(input);
          }}
          style={styles.button}
          title="+"
          size={40}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: spacing.md,
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputField: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    marginLeft: spacing.md,
  },
});
