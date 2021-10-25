import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import BookCard from '../../components/BookCard';
import AppLoading from 'expo-app-loading';
import apiService from './../../ApiService';
import {
  useFonts,
  Rosario_400Regular,
  Rosario_400Regular_Italic,
} from '@expo-google-fonts/rosario';

const SendRequest = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({
    Rosario_400Regular,
    Rosario_400Regular_Italic,
  });
  const { booksCurrUser, UserMatch, Username } = route.params.UsersInfo;
  const [matchesFromLibraryToSell, setMatchesFromLibraryToSell] = useState([]);
  const [matchesFromWishList, setMatchesFromWishList] = useState([]);

  useEffect(() => {
    async function fetchBookOfOtherUser(otherUserId) {
      let response = await apiService.getUserBooks(otherUserId, 'all');
      const IsbnLibraryUser = booksCurrUser.booksToSell.map(
        (book) => book.ISBN,
      );
      const IsbnWishListUser = booksCurrUser.booksToBuy.map(
        (book) => book.ISBN,
      );
      let matchesLibrary = response.booksToBuy.filter((books) =>
        IsbnLibraryUser.includes(books.ISBN),
      );
      let matchesWishList = response.booksToSell.filter((books) =>
        IsbnWishListUser.includes(books.ISBN),
      );
      setMatchesFromWishList(matchesWishList);
      setMatchesFromLibraryToSell(matchesLibrary);
    }
    fetchBookOfOtherUser(UserMatch);
  }, [UserMatch, booksCurrUser.booksToSell, booksCurrUser.booksToBuy]);

  function removeBookFromWishList(book) {
    setMatchesFromWishList((prev) =>
      prev.filter((allBooks) => allBooks.ISBN !== book.ISBN),
    );
  }

  function removeBookFromLibraryToSell(book) {
    setMatchesFromLibraryToSell((prev) =>
      prev.filter((allBooks) => allBooks.ISBN !== book.ISBN),
    );
  }

  function addDetails() {
    navigation.navigate('Add Details To The Request', {
      matchesFromWishList,
      matchesFromLibraryToSell,
      UserMatch,
      UsernameOtherUser: Username,
    });
  }

  //TODO: fix scrolling of the two FlatLists

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.mainHeader}>
          In this section you can send a request to {Username}, remove the books
          you don't want to swap anymore and then press continue
        </Text>
        {matchesFromWishList.length > 0 ? (
          <View style={styles.flatListContainer}>
            <Text style={styles.text}>
              {Username} has these books to offer you
            </Text>
            <FlatList
              style={styles.flatList}
              data={matchesFromWishList}
              keyExtractor={(item) => item.ISBN}
              renderItem={({ item }) => (
                <BookCard
                  bookObj={item}
                  removeBtn={() => removeBookFromWishList(item)}
                />
              )}
            />
          </View>
        ) : null}
        {matchesFromLibraryToSell.length > 0 ? (
          <View style={styles.flatListContainer}>
            <Text style={styles.text}>You can offer him these books</Text>
            <FlatList
              style={styles.flatList}
              data={matchesFromLibraryToSell}
              keyExtractor={(item) => item.ISBN}
              renderItem={({ item }) => (
                <BookCard
                  bookObj={item}
                  removeBtn={() => removeBookFromLibraryToSell(item)}
                />
              )}
            />
          </View>
        ) : null}
        {matchesFromLibraryToSell.length > 0 ||
        matchesFromWishList.length > 0 ? (
          <Button
            mode="contained"
            onPress={() => addDetails()}
            style={styles.buttonAddDetails}
            labelStyle={styles.label}
          >
            Add details
          </Button>
        ) : null}
      </ScrollView>
    );
  }
};

export default SendRequest;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Rosario_400Regular_Italic',
    fontSize: 16,
    paddingTop: 30,
  },
  flatListContainer: {
    alignItems: 'center',
  },
  flatList: {
    paddingBottom: 10,
  },
  container: {
    backgroundColor: 'white',
  },
  mainHeader: {
    fontFamily: 'Rosario_400Regular',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 15,
    textAlign: 'center',
  },
  buttonAddDetails: {
    marginHorizontal: 20,
    backgroundColor: '#5D3FD3',
    marginTop: 40,
    marginBottom: 30,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 16,
  },
});
