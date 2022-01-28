import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';

import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ({ focusSubject, onTimerEnd }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(20);
  const [progress, setProgress] = useState(0);
  const focusTimes = [0.3, 10, 15, 20];

  const selectTimeButtons = focusTimes.map(time => {
    return (
      <RoundedButton
        key={time.toString()}
        title={time}
        size={60}
        onPress={() => {
          setMinutes(time);
          setProgress(0);
          setIsStarted(false);
        }}
      />
    );
  });

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(PATTERN);
    }
  };

  const onEnd = isStarted => {
    vibrate();
    setIsStarted(isStarted);
    onTimerEnd();
  };

  const clearSubject = () => {
    setIsStarted(isStarted);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <ProgressBar progress={progress} color="#fff" />
      </View>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          timerEnded={onEnd}
        />
      </View>
      <View style={styles.focusTextContainer}>
        <Text style={styles.title}> Focusing on: </Text>
        <Text style={styles.task}> {focusSubject}</Text>
      </View>
      <View style={styles.timeButtonContainer}>{selectTimeButtons}</View>
      <View style={styles.startBtn}>
        <RoundedButton
          title={isStarted ? 'Pause' : 'Start'}
          size={100}
          onPress={() => setIsStarted(!isStarted)}
        />
      </View>
      <View style={styles.clearContainer}>
        <RoundedButton
          onPress={() => {
            clearSubject();
          }}
          style={styles.button}
          title="-"
          size={50}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  task: {
    color: colors.white,
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: spacing.lg,
    width: 320,
  },
  focusTextContainer: {
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  timeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  startBtn: {
    alignSelf: 'center',
  },
});
