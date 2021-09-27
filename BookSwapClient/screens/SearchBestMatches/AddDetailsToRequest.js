import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  IconButton,
  Colors,
  Button,
  RadioButton,
  Switch,
  TextInput,
} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

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

import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';

const AddDetailsToRequest = ({ route, navigation }) => {
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
  const { user } = useContext(UserContext);

  const { matchesFromWishList, matchesFromLibraryToSell, UserMatch } =
    route.params;
  const [monetaryCompensationYesOrNo, setMonetaryCompensationYesOrNo] =
    useState(false);
  const [AskOrGiveMoney, setAskOrGiveMoney] = useState(true);
  const [monetaryCompensationValue, setMonetaryCompensationValue] = useState(0);
  const [comment, setComment] = useState(null);

  const onToggleSwitch = () => setAskOrGiveMoney(!AskOrGiveMoney);

  function sendRequest() {
    const requestFromUser = {
      userFrom: user.id,
      userTo: UserMatch,
      hasBeenViewed: false,
      booksOffered: matchesFromLibraryToSell,
      booksAsked: matchesFromWishList,
      monetaryCompensation: monetaryCompensationYesOrNo,
      monetaryCompensationValue: monetaryCompensationValue,
      askingMoney: AskOrGiveMoney,
      comment: comment,
      status: 'pending',
      timeStamp: Date.now(),
    };
    fetch(`${BASE_URL}/requests/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestFromUser),
    })
      .then(() => {
        fetch(`${BASE_URL}/requests/${UserMatch}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestFromUser),
        });
      })
      .catch((err) => console.log(err))
      .then(navigation.navigate('Request Sent'));
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.monetaryCompensContainer}>
          {monetaryCompensationYesOrNo === true ? (
            <View style={styles.toggleContainer}>
              {AskOrGiveMoney ? (
                <Text style={styles.toggleText}>Ask Money</Text>
              ) : (
                <Text style={styles.toggleText}>Give Money</Text>
              )}
              <Switch
                value={AskOrGiveMoney}
                onValueChange={onToggleSwitch}
                color={'purple'}
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="$"
                value={monetaryCompensationValue}
                onChangeText={setMonetaryCompensationValue}
              />
            </View>
          ) : (
            <View style={styles.headerContainer}>
              <Text style={styles.header}>
                Press the button below if you want to give or ask money on top
                of the books (optional).
              </Text>
              <View>
                <Button
                  mode="contained"
                  onPress={() => setMonetaryCompensationYesOrNo(true)}
                  style={styles.buttonAddMonCompens}
                  labelStyle={{ fontSize: 16 }}
                >
                  Add compensation
                </Button>
              </View>
            </View>
          )}
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            Add some text to the request (optional)
          </Text>
        </View>
        <TextInput
          style={styles.messageInput}
          mode="outlined"
          label="message"
          value={comment}
          onChangeText={setComment}
        />
        <Button
          mode="contained"
          onPress={() => sendRequest()}
          style={styles.buttonSendReq}
          labelStyle={{ fontSize: 16 }}
        >
          send request
        </Button>
      </View>
    );
  }
};

export default AddDetailsToRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  monetaryCompensContainer: {
    height: 180,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 40,
  },
  toggleText: {
    width: 90,
    fontFamily: 'Rosario_500Medium',
    fontSize: 18,
  },
  buttonAddMonCompens: {
    marginHorizontal: 20,
    backgroundColor: '#5D3FD3',
    marginTop: 20,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    paddingBottom: 10,
  },
  buttonSendReq: {
    marginHorizontal: 20,
    backgroundColor: '#AA336A',
    marginTop: 20,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 17,
    paddingTop: 20,
    textAlign: 'center',
    width: 300,
  },
  input: {
    height: 40,
    width: 80,
  },
  messageInput: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  headerContainer: {
    alignItems: 'center',
  },
});
