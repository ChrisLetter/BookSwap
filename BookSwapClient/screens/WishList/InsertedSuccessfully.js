import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InsertedSuccessfully = ({ navigation }) => {
  return (
    <View>
      <Text>Book added correctly to your wish list!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Whish List')}>
        <Text>Go back to your wish list</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Add a New Book')}>
        <Text>Insert another book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InsertedSuccessfully;
