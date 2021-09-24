import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BookAddedSuccessfully = ({ navigation }) => {
  return (
    <View>
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
