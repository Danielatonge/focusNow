import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/Timer';

export default function App() {
  const [focusSubject, setFocusSubject] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {!focusSubject ? (
          <Focus addSubject={setFocusSubject} />
        ) : (
          <Timer focusSubject={focusSubject}> </Timer>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 0.5,
    padding: spacing.md,
  },
});
