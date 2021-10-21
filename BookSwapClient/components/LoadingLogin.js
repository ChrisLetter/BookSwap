import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingLogin = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.lottieContainer}>
        <LottieView
          style={styles.lottie}
          source={require('./../assets/readABook.json')}
          autoPlay
          loop={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoadingLogin;

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    alignItems: 'center',
  },
  lottie: {
    paddingTop: 95,
    height: 350,
  },
});
