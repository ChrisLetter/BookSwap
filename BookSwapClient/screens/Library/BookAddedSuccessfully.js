import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import LottieView from 'lottie-react-native';

const BookAddedSuccessfully = ({ navigation }) => {
  return (
    <View>
      <LottieView
        style={styles.lottie}
        source={require('./../../assets/task-completed-done.json')}
        autoPlay
      />
      <Text>Book added correctly to your library!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Your Library')}>
        <Text>Go back to your library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Insert A New Book')}
      >
        <Text>Insert another book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookAddedSuccessfully;

const styles = StyleSheet.create({
  lottie: {
    width: 40,
    height: 40,
  },
});
