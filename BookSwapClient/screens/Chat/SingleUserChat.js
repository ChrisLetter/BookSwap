import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../AuthContext';
import { useFonts, Rosario_500Medium } from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';
import apiService from './../../ApiService';

const SingleUserChat = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({
    Rosario_500Medium,
  });
  const isFocused = useIsFocused();
  const { otherUser } = route.params;
  const [allMessages, setAllMessages] = useState([]);
  const { user } = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    async function fetchMessagesFromDb(userId) {
      const res = await apiService.getMessages(userId);
      const [onlyRelevantMessages] = res.filter(
        (message) => message.otherUser === otherUser,
      );
      setAllMessages(onlyRelevantMessages);
    }
    let timer1 = setInterval(() => fetchMessagesFromDb(user.id), 100);

    return () => {
      clearTimeout(timer1);
    };
  }, [isFocused, user.id, otherUser]);

  function fromTimeStampToHours(timestamp) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(timestamp).toLocaleTimeString('it-IT', options);
  }

  async function sendMessage() {
    const message = {
      userFrom: user.id,
      userTo: otherUser,
      content: currentMessage,
      timeStamp: Date.now(),
    };
    await apiService.sendMessage(otherUser, user.id, message);
    await apiService.sendMessage(user.id, otherUser, message);
    await apiService
      .toggleNotificationMessage(otherUser, user.id, 'true')
      .then(() => setCurrentMessage(null));
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View>
          {allMessages ? (
            <FlatList
              style={styles.flatList}
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
                  <Text
                    style={
                      item.userTo === user.id
                        ? styles.hoursOtherUser
                        : styles.hoursUser
                    }
                  >
                    {fromTimeStampToHours(item.timeStamp)}
                  </Text>
                </View>
              )}
            />
          ) : null}
          <View style={styles.sendMessage}>
            <TextInput
              style={styles.inputBar}
              value={currentMessage}
              onChangeText={setCurrentMessage}
            />
            <IconButton
              style={styles.plusButton}
              icon="send"
              color={Colors.purple600}
              size={25}
              onPress={() => sendMessage()}
            />
          </View>
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
    position: 'relative',
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
    textAlign: 'left',
    color: 'white',
    paddingTop: 10,
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
    textAlign: 'right',
    color: 'white',
    paddingTop: 10,

    paddingHorizontal: 20,
  },
  hoursUser: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 12,
    textAlign: 'right',
    color: 'white',
    paddingBottom: 4,
    paddingRight: 10,
  },
  hoursOtherUser: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 12,
    textAlign: 'left',
    color: 'white',
    paddingBottom: 4,
    paddingLeft: 10,
  },
  sendMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '100%',
  },
  inputBar: {
    borderWidth: 1,
    borderColor: 'grey',
    width: 320,
    borderRadius: 20,
    paddingLeft: 10,
    marginLeft: 20,
    marginVertical: 10,
    paddingVertical: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  flatList: {
    height: 630,
    overflow: 'scroll',
  },
});
