import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../../AuthContext';

const UserLibrary = () => {
  const { user } = useContext(UserContext);

  return (
    <View>
      {console.log(user.name)}
      <Text>User Library Working</Text>
    </View>
  );
};

export default UserLibrary;
