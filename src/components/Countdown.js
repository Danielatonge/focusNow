import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMilliseconds = min => min * 1000 * 60;

const formatTime = time => (time < 10 ? `0${time}` : time);

setInterval(() => {});

export const Countdown = ({ minutes = 20, isPaused = true }) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minutesToMilliseconds(minutes));

  const countDown = () => {
    setMillis(time => {
      if (time <= 0) {
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };
  useEffect(() => {
    if (isPaused) return;
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, []);
  const minutesLeft = Math.floor(millis / 1000 / 60) % 60;
  const secondsLeft = Math.floor(millis / 1000) % 60;
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
