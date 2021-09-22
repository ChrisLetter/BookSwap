import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login Page Working</Text>
      <TouchableOpacity
        style={{ paddingBottom: 30, paddingTop: 30 }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
