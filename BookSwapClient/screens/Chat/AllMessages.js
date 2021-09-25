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

const AllMessages = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);
  const [allMessages, setAllMessages] = useState([]);

  async function fetchMessagesFromDb() {
    try {
      let response = await fetch(`${BASE_URL}/messages/${user.id}`);
      let json = await response.json();
      setAllMessages(json);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessagesFromDb();
  }, [isFocused]);

  function turnOffTheNotification(otherUser) {
    fetch(`${BASE_URL}/messages/${user.id}/${otherUser}/false/notification`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Text>Enter the chat</Text>
      </TouchableOpacity>
      {/* {console.log(allMessages)} */}
      <FlatList
        data={allMessages}
        keyExtractor={(item) => item.otherUser}
        renderItem={({ item }) => (
          <View
            style={
              item.notification
                ? styles.withNotification
                : styles.withoutNotification
            }
          >
            <Text>{item.otherUser}</Text>
            <Text>{item.lastMessage}</Text>
            <TouchableOpacity
              onPress={() => {
                if (item.notification) {
                  turnOffTheNotification(item.otherUser);
                }
                navigation.navigate('Chat', {
                  messages: item,
                  otherUser: item.otherUser,
                });
              }}
            >
              <Text>Enter the chat</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  withoutNotification: {
    backgroundColor: 'lavender',
  },
  withNotification: {
    backgroundColor: 'cyan',
  },
});

export default AllMessages;
