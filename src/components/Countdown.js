import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMilliseconds = min => min * 1000 * 60;

const formatTime = time => (time < 10 ? `0${time}` : time);

setInterval(() => { });

export const Countdown = ({ minutes, isPaused, onProgress, timerEnded }) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(0);

  const minutesLeft = Math.floor(millis / 1000 / 60) % 60;
  const secondsLeft = Math.floor(millis / 1000) % 60;

  const countDown = () => {
    setMillis(time => {
      if (time < 0) {
        clearInterval(interval.current);
        timerEnded(false);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    const timeFraction = millis / minutesToMilliseconds(minutes);
    onProgress(Math.abs(timeFraction - 1));

    if (millis < 0) {
      timerEnded(false);
    }
  }, [millis]);

  useEffect(() => {
    setMillis(minutesToMilliseconds(minutes));

    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [minutes, isPaused]);
  return (
    <View>
      <Text style={styles.timer}>
        {formatTime(minutesLeft)} : {formatTime(secondsLeft)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
  },
  timer: {
    alignSelf: 'center',
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
  },
});
