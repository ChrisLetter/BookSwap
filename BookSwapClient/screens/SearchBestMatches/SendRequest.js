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
} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';

const SendRequest = ({ route, navigation }) => {
  const { user } = useContext(UserContext);

  const isFocused = useIsFocused();
  const { booksCurrUser, UserMatch, userBooksLibrary, userBooksWishList } =
    route.params.UsersInfo;
  const [otherUserBooks, setOtherUserBooks] = useState(null);
  const [matchesFromLibraryToSell, setMatchesFromLibraryToSell] = useState([]);
  const [matchesFromWishList, setMatchesFromWishList] = useState([]);

  async function fetchBookOfOtherUser() {
    try {
      let response = await fetch(`${BASE_URL}/books/${UserMatch}/all`);
      let json = await response.json();
      setOtherUserBooks(json);
      let matchesFromLibraryToSell = json.booksToBuy.filter((books) =>
        userBooksLibrary.includes(books.ISBN),
      );
      let matchesFromWishList = json.booksToSell.filter((books) =>
        userBooksWishList.includes(books.ISBN),
      );
      setMatchesFromWishList(matchesFromWishList);
      setMatchesFromLibraryToSell(matchesFromLibraryToSell);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (UserMatch) fetchBookOfOtherUser();
  }, []);

  function removeBookfromWishList(book) {
    setMatchesFromWishList((prev) =>
      prev.filter((allbooks) => allbooks.ISBN !== book.ISBN),
    );
  }

  function removeBookfromLibraryToSell(book) {
    setMatchesFromLibraryToSell((prev) =>
      prev.filter((allbooks) => allbooks.ISBN !== book.ISBN),
    );
  }

  function addDetails() {
    navigation.navigate('Add Details To The Request', {
      matchesFromWishList,
      matchesFromLibraryToSell,
      UserMatch,
    });
  }

  //TODO: fix scrolling of the two FlatLists

  return (
    <ScrollView>
      {matchesFromWishList.length > 0 ? (
        <View>
          <Text>Books that user {UserMatch} has from your Wish List</Text>
          <FlatList
            // scrollEnabled={false}
            data={matchesFromWishList}
            keyExtractor={(item) => item.ISBN}
            renderItem={({ item }) => (
              <View>
                <View style={{ width: 120, height: 192 }}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View>
                  <Text>{item.title}</Text>
                  <Text>{item.authors}</Text>
                  <Text>{item.publisher}</Text>
                  <Text>{item.publishedDate}</Text>
                  <Text>{item.ISBN}</Text>
                  <Button
                    onPress={() => removeBookfromWishList(item)}
                    title="I am not interested in this book"
                    color="#841584"
                  />
                </View>
              </View>
            )}
          />
        </View>
      ) : null}
      {matchesFromLibraryToSell.length > 0 ? (
        <View>
          <Text>Books that user {UserMatch} has from your Library</Text>
          <FlatList
            // scrollEnabled={false}
            data={matchesFromLibraryToSell}
            keyExtractor={(item) => item.ISBN}
            renderItem={({ item }) => (
              <View>
                <View style={{ width: 120, height: 192 }}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View>
                  <Text>{item.title}</Text>
                  <Text>{item.authors}</Text>
                  <Text>{item.publisher}</Text>
                  <Text>{item.publishedDate}</Text>
                  <Text>{item.ISBN}</Text>
                  <Button
                    onPress={() => removeBookfromLibraryToSell(item)}
                    title="Do not include this"
                    color="#841584"
                  />
                </View>
              </View>
            )}
          />
        </View>
      ) : null}
      {matchesFromLibraryToSell.length > 0 || matchesFromWishList.length > 0 ? (
        <View>
          <Button
            onPress={() => addDetails()}
            title="Continue"
            color="#841584"
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

export default SendRequest;
