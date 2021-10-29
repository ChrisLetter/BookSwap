import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';

const RequestSent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={require('./../../assets/loading-email.json')}
        autoPlay
        loop={true}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Best Matches')}
        style={styles.searchAnotherMatch}
        labelStyle={styles.label}
      >
        Search other matches
      </Button>
    </View>
  );
};

export default RequestSent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    left: -20,
    width: 300,
    height: 400,
  },
  searchAnotherMatch: {
    marginHorizontal: 20,
    backgroundColor: '#5D3FD3',
    marginTop: 60,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 16,
  },
});
