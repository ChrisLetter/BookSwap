import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';
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

const SingleUserChat = ({ route, navigation }) => {
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
  const isFocused = useIsFocused();
  const { otherUser } = route.params;
  const [allMessages, setAllMessages] = useState([]);
  const { user } = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState(null);

  async function fetchMessagesFromDb() {
    try {
      let response = await fetch(`${BASE_URL}/messages/${user.id}`);
      let json = await response.json();
      const [onlyRelevantMessages] = json.filter(
        (message) => message.otherUser === otherUser,
      );
      setAllMessages(onlyRelevantMessages);
    } catch (err) {
      console.log(err);
    }
  }

  function checkForNewMessages() {
    if (isFocused) setInterval(() => fetchMessagesFromDb(), 100);
  }

  useEffect(() => {
    checkForNewMessages();
  }, []);

  function sendMessage() {
    const message = {
      userFrom: user.id,
      userTo: otherUser,
      content: currentMessage,
      timeStamp: Date.now(),
    };
    fetch(`${BASE_URL}/messages/${otherUser}/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then(() => {
        fetch(`${BASE_URL}/messages/${user.id}/${otherUser}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      })
      .then(() => {
        fetch(
          `${BASE_URL}/messages/${otherUser}/${user.id}/true/notification`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      })
      .catch((err) => console.log(err));
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View>
          {allMessages ? (
            <FlatList
              data={allMessages.msgs}
              keyExtractor={(item) => item.timeStamp.toString()}
              renderItem={({ item }) => (
                <View
                  style={
                    item.userTo === 'startingMessage'
                      ? styles.starting
                      : item.userTo === user.id
                      ? styles.otherUser
                      : styles.user
                  }
                >
                  <Text
                    style={
                      item.userTo === 'startingMessage'
                        ? styles.startingText
                        : item.userTo === user.id
                        ? styles.otherUserText
                        : styles.userText
                    }
                  >
                    {item.content}
                  </Text>
                </View>
              )}
            />
          ) : null}
          <TextInput
            style={{ borderWidth: 1, borderColor: 'grey' }}
            value={currentMessage}
            onChangeText={setCurrentMessage}
          />
          <Button
            onPress={() => sendMessage()}
            title="send the message"
            color="#841584"
          />
        </View>
      </View>
    );
  }
};

export default SingleUserChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  starting: {
    textAlign: 'center',
  },
  startingText: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 20,
  },
  user: {
    alignSelf: 'flex-start',
    backgroundColor: '#5D3FD3',
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 20,
  },
  userText: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    padding: 10,
    paddingHorizontal: 20,
  },
  otherUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#A73FD3',
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 20,
  },
  otherUserText: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    padding: 10,
    paddingHorizontal: 20,
  },
});
