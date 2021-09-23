import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import apiServiceJWT from '../../ApiServiceJWT';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    const user = { email, password };
    const res = await apiServiceJWT.login(user);
    if (res.error) {
      alert(`${res.message}`);
      setEmail('');
      setPassword('');
    } else {
      const { accessToken } = res;
      console.log(res);
    }
  };

  return (
    <View>
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>email</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>password</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <View>
          <Text style={{ paddingBottom: 30, paddingTop: 30 }}>Submit!</Text>
        </View>
      </TouchableOpacity>
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
