import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUS = {
  COMPLETED: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState('');
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistory = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { subject, status, id: String(focusHistory.length + 1) },
    ]);
  };

  const onClearHistory = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('@focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.error(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('@focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    console.log('History Changed:', focusHistory);
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {!focusSubject ? (
          <>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory
              focusHistory={focusHistory}
              onClear={onClearHistory}
            />
          </>
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
