import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/Timer';

const STATUS = {
  COMPLETED: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState('');
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistory = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  console.log(focusHistory);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {!focusSubject ? (
          <Focus addSubject={setFocusSubject} />
        ) : (
          <Timer
            focusSubject={focusSubject}
            onTimerEnd={() => {
              addFocusHistory(focusSubject, STATUS.COMPLETED);
              setFocusSubject(null);
            }}
            onCancelled={() => {
              addFocusHistory(focusSubject, STATUS.CANCELLED);
              setFocusSubject(null);
            }}
          />
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
