import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import apiServiceJWT from '../../ApiServiceJWT';
import { UserContext } from '../../AuthContext';
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {
  useFonts,
  Rosario_300Light,
  Rosario_400Regular,
  Rosario_500Medium,
  Rosario_600SemiBold,
  Rosario_700Bold,
  Rosario_300Light_Italic,
  Rosario_400Regular_Italic,
  Rosario_500Medium_Italic,
  Rosario_600SemiBold_Italic,
  Rosario_700Bold_Italic,
} from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';
import LoadingLogin from '../../components/LoadingLogin';

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Rosario_300Light,
    Rosario_400Regular,
    Rosario_500Medium,
    Rosario_600SemiBold,
    Rosario_700Bold,
    Rosario_300Light_Italic,
    Rosario_400Regular_Italic,
    Rosario_500Medium_Italic,
    Rosario_600SemiBold_Italic,
    Rosario_700Bold_Italic,
  });
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const user = { email, userPassword };
    const res = await apiServiceJWT.login(user);
    if (res.error) {
      alert(`${res.message}`);
      setEmail('');
      setUserPassword('');
    } else {
      const { accessToken, id } = res;
      setTimeout(() => {
        login(accessToken, id);
        setIsLoading(false);
      }, 1400);
    }
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {!isLoading ? (
          <View>
            <View style={styles.lottieContainer}>
              <Text style={styles.mainH1}> BookSwap </Text>
              <LottieView
                style={styles.images}
                source={require('./../../assets/reading.json')}
                autoPlay
                loop={false}
              />
            </View>
            <View>
              <TextInput
                label="email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                mode="outlined"
              />
              <TextInput
                label="password"
                style={styles.input}
                value={userPassword}
                onChangeText={setUserPassword}
                mode="outlined"
                secureTextEntry={true}
              />
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.buttonLogin}
                labelStyle={{ fontSize: 16 }}
              >
                login
              </Button>
              <Text style={styles.header}> Don't have an account? </Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Register')}
                style={styles.buttonRegister}
                labelStyle={{ fontSize: 16 }}
              >
                Register
              </Button>
            </View>
          </View>
        ) : (
          <LoadingLogin />
        )}
      </View>
    );
  }
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 0,
  },
  buttonLogin: {
    marginHorizontal: 20,
    marginTop: 5,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#5D3FD3',
  },
  buttonRegister: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#AA336A',
  },
  header: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 130,
  },
  images: {
    height: 250,
    alignItems: 'center',
    marginBottom: -15,
  },
  mainH1: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 55,
  },
  lottieContainer: {
    alignItems: 'center',
  },
});
