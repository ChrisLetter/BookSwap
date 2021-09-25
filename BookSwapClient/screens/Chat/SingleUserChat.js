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

const SingleUserChat = ({ route, navigation }) => {
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

  return (
    <View>
      <View>
        {allMessages ? (
          <FlatList
            data={allMessages.msgs}
            keyExtractor={(item) => item.timeStamp.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.content}</Text>
              </View>
            )}
          />
        ) : null}
        <Text>Enter here the message </Text>
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
};

export default SingleUserChat;
