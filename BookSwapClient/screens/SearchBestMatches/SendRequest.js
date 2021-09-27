import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { IconButton, Colors, Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';
import BookCard from '../../components/BookCard';
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

const SendRequest = ({ route, navigation }) => {
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

  const isFocused = useIsFocused();
  const {
    booksCurrUser,
    UserMatch,
    userBooksLibrary,
    userBooksWishList,
    Username,
  } = route.params.UsersInfo;
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
              style={styles.flatlist}
              data={matchesFromWishList}
              keyExtractor={(item) => item.ISBN}
              renderItem={({ item }) => (
                <BookCard
                  bookObj={item}
                  removeBtn={() => removeBookfromWishList(item)}
                />
              )}
            />
          </View>
        ) : null}
        {matchesFromLibraryToSell.length > 0 ? (
          <View style={styles.flatListContainer}>
            <Text style={styles.text}>You can offer him these books</Text>
            <FlatList
              style={styles.flatlist}
              data={matchesFromLibraryToSell}
              keyExtractor={(item) => item.ISBN}
              renderItem={({ item }) => (
                <BookCard
                  bookObj={item}
                  removeBtn={() => removeBookfromLibraryToSell(item)}
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
            labelStyle={{ fontSize: 16 }}
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
  flatlist: {
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
});
