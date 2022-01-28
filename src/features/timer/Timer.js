import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';

export const Timer = ({ focusSubject }) => {
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown />
      </View>
      <View>
        <Text style={styles.title}> Focusing on: </Text>
        <Text style={styles.task}> {focusSubject}</Text>
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
    width: 300
  },
});
