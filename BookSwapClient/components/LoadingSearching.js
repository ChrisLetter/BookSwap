import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingSearching = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.lottieContainer}>
        <LottieView
          style={styles.lottie}
          source={require('./../assets/search.json')}
          autoPlay
          loop={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoadingSearching;

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    alignItems: 'center',
  },
  lottie: {
    paddingTop: 50,
    height: 350,
  },
});
