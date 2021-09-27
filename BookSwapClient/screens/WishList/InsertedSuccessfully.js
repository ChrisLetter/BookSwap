import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';

const InsertedSuccessfully = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={require('./../../assets/task-completed-done.json')}
        autoPlay
        loop={false}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Your Wish List')}
        style={styles.buttonGoToLibrary}
        labelStyle={{ fontSize: 16 }}
      >
        Back to the Wish List
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Add a New Book')}
        style={styles.buttonAddAnotherOne}
        labelStyle={{ fontSize: 16 }}
      >
        Add another one
      </Button>
    </View>
  );
};

export default InsertedSuccessfully;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: 400,
    height: 400,
  },
  buttonGoToLibrary: {
    marginHorizontal: 20,
    backgroundColor: '#AA336A',
    marginTop: 20,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonAddAnotherOne: {
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
});
