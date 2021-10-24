import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { UserContext } from '../../AuthContext';
import {
  useFonts,
  Rosario_400Regular_Italic,
} from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';
import BookCard from '../../components/BookCard';
import { REACT_APP_API_KEY } from '@env';
import apiService from './../../ApiService';

const SelectFromInput = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({ Rosario_400Regular_Italic });
  const { user } = useContext(UserContext);
  const { title, authors, isbn } = route.params.FormInfo;
  const [books, setBooks] = useState(null);

  useEffect(() => {
    fetchBookFromUserInput(title, authors, isbn, REACT_APP_API_KEY);
  }, [title, authors, isbn]);

  // in this function, based on the input of the user, I create the correct
  // url to query the google book database
  async function fetchBookFromUserInput(
    titleInput,
    authorInput,
    isbnInput,
    key,
  ) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=';
    if (titleInput !== null) {
      titleInput = titleInput.split(' ').join('+');
      url += `intitle:${titleInput}`;
    }
    if (authorInput !== null && titleInput !== null) {
      authorInput = authorInput.split(' ').join('+');
      url += `+inauthor:${authorInput}`;
    }
    if (authorInput !== null && titleInput === null) {
      authorInput = authorInput.split(' ').join('+');
      url += `inauthor:${authorInput}`;
    }
    if (isbnInput !== null && titleInput === null && authorInput === null) {
      url += `isbn:${isbnInput}`;
    }
    if (
      (isbnInput !== null && titleInput !== null) ||
      (isbnInput !== null && authorInput !== null)
    ) {
      url += `+isbn:${isbnInput}`;
    }
    const result = await apiService.searchBooksByFormGoogle(url, key);
    const filteredResult = result.items
      .slice(0, 15)
      .map((book) => book.volumeInfo)
      .filter((test) => test.industryIdentifiers !== undefined);
    setBooks(filteredResult);
  }

  // I need this function because the results from the API are not
  // consistent, some books have 2 ISBN codes (one has 13 digit, another 10),
  //  with this function I filter them and I keep only the 13 digit one.
  function extractISBN13(arr) {
    const filtered = arr.filter((elem) => elem.identifier.length >= 13);
    return filtered[0].identifier;
  }

  async function InsertBookInDb(item) {
    const BookInfo = {
      title: item.title,
      authors: item.authors,
      ISBN: extractISBN13(item.industryIdentifiers),
      publisher: item.publisher,
      thumbnail: item.imageLinks.thumbnail,
      publishedDate: item.publishedDate,
    };
    await apiService.addBook(user.id, 'library', BookInfo);
    await apiService
      .addBookToISBNList(user.id, BookInfo.ISBN, 'sell')
      .then(navigation.navigate('Book Added Successfully'));
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Click on the right book </Text>
        <FlatList
          data={books}
          keyExtractor={(item) => extractISBN13(item.industryIdentifiers)}
          renderItem={({ item }) => (
            <BookCard bookObj={item} addBtn={() => InsertBookInDb(item)} />
          )}
        />
      </View>
    );
  }
};

export default SelectFromInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wholeResult: {
    flexDirection: 'row',
    margin: 10,
  },
  header: {
    fontSize: 18,
    fontFamily: 'Rosario_400Regular_Italic',
    textAlign: 'center',
    paddingBottom: 10,
  },
});
