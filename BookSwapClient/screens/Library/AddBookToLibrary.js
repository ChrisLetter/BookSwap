import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../../AuthContext';

const AddBookToLibrary = () => {
  const { logout } = useContext(UserContext);

  return (
    <View>
      <Text>User Library Working</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBookToLibrary;
