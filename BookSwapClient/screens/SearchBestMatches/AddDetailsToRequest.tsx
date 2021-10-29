import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Switch, TextInput } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import apiService from '../../ApiService';
import { useFonts, Rosario_500Medium } from '@expo-google-fonts/rosario';
import { UserContext } from '../../AuthContext';

const AddDetailsToRequest = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({ Rosario_500Medium });
  const { user } = useContext(UserContext);
  const [Username, setUsername] = useState({ username: '' });

  useEffect(() => {
    async function fetchUsernameFromDb() {
      let response = await apiService.getUsername(user.id);
      setUsername(response);
    }
    fetchUsernameFromDb();
  }, [user]);

  const {
    matchesFromWishList,
    matchesFromLibraryToSell,
    UserMatch,
    UsernameOtherUser,
  } = route.params;

  const [monetaryCompensationYesOrNo, setMonetaryCompensationYesOrNo] =
    useState(false);
  const [AskOrGiveMoney, setAskOrGiveMoney] = useState(true);
  const [monetaryCompensationValue, setMonetaryCompensationValue] =
    useState('');
  const [comment, setComment] = useState('');

  const onToggleSwitch = () => setAskOrGiveMoney(!AskOrGiveMoney);

  function sendRequest() {
    const requestFromUser = {
      userFrom: user.id,
      userFromUsername: Username.username,
      userTo: UserMatch,
      userToUsername: UsernameOtherUser,
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
    apiService.sendRequest(user.id, requestFromUser);
    apiService
      .sendRequest(UserMatch, requestFromUser)
      .then(navigation.navigate('Request Sent'));
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.monetaryCompensationContainer}>
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
                  style={styles.buttonMonetaryCompensation}
                  labelStyle={styles.label}
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
          labelStyle={styles.label}
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
  monetaryCompensationContainer: {
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
  buttonMonetaryCompensation: {
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
  label: {
    fontSize: 16,
  },
});
