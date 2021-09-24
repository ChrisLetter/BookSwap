import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import apiServiceJWT from '../../ApiServiceJWT';
import { UserContext } from '../../AuthContext';

const Register = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = async (e) => {
    const user = { username, email, userPassword };
    const res = await apiServiceJWT.register(user);
    setUsername('');
    setEmail('');
    setUserPassword('');
    console.log(res);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      const { accessToken, id } = res;
      login(accessToken, id);
    }
  };

  return (
    <View>
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>username</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>email</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>password</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={userPassword}
        onChangeText={setUserPassword}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <View>
          <Text style={{ paddingBottom: 30, paddingTop: 30 }}>Submit!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
