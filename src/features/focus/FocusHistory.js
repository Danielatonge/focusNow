import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

export const FocusHistory = ({ focusHistory, onClear }) => {

  const HistoryItem = ({ item, index }) => {
    const color = item.status == 1 ? 'green' : 'red';
    return <Text style={[styles.item, { color }]}>{item.subject}</Text>;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {focusHistory && focusHistory.length ? (
          <>
            <Text style={styles.context}>Things we've focused on:</Text>
            <FlatList
              contentContainerStyle={styles.list}
              data={focusHistory}
              renderItem={HistoryItem}
              keyExtractor={item => item.id}
            />
          </>
        ) : (
          <Text style={styles.context}>You've nothing to focus</Text>
        )}
      </View>
      <View style={styles.clearBtn}>
        <RoundedButton title={'Clear'} size={100} onPress={() => onClear()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  context: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 15,
    color: 'white',
  },
  item: {
    marginHorizontal: 50,
    padding: 12,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearBtn: {
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
});
