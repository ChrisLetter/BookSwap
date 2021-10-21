import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';

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

const DisplaySingleRequest = (props) => {
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
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.cardContainer}>
        {props.info?.userFrom === props.user ? (
          <TouchableOpacity onPress={props.pressing}>
            <LinearGradient
              colors={
                props.info?.hasBeenViewed
                  ? ['#c32f27', '#d8572a']
                  : ['#5D3FD3', '#AA336A']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <Text style={styles.text}>
                You sent a request to {props.info?.userToUsername}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={props.pressing}>
            <LinearGradient
              colors={
                !props.info?.hasBeenViewed
                  ? ['#c32f27', '#d8572a']
                  : ['#5D3FD3', '#AA336A']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <Text style={styles.text}>
                {props.info?.userFromUsername} sent you a request
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    );
  }
};

export default DisplaySingleRequest;

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    zIndex: -5,
  },
  card: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    padding: 6,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Rosario_500Medium',
    fontSize: 17,
    padding: 20,
  },
});
