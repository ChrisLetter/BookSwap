import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { UserContext } from '../../AuthContext';
import { Image } from 'react-native-elements';
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
import BookCard from '../../components/BookCard';
import { REACT_APP_API_KEY } from '@env';

import { BASE_URL, SERVER_PORT } from '@env';

const SelectFromInputWL = ({ route, navigation }) => {
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
  const { title, authors, isbn } = route.params.FormInfo;
  const [books, setBooks] = useState(null);

  useEffect(() => {
    fetchBookFromUserInput(title, authors, isbn, REACT_APP_API_KEY);
  }, [title, authors, isbn]);

  function fetchBookFromUserInput(titleInput, authorInput, isbnInput, key) {
    let apiLink = 'https://www.googleapis.com/books/v1/volumes?q=';
    if (titleInput !== null) {
      titleInput = titleInput.split(' ').join('+');
      apiLink += `intitle:${titleInput}`;
    }
    if (authorInput !== null && titleInput !== null) {
      authorInput = authorInput.split(' ').join('+');
      apiLink += `+inauthor:${authorInput}`;
    }
    if (authorInput !== null && titleInput === null) {
      authorInput = authorInput.split(' ').join('+');
      apiLink += `inauthor:${authorInput}`;
    }
    if (isbnInput !== null && titleInput === null && authorInput === null) {
      apiLink += `isbn:${isbnInput}`;
    }
    if (
      (isbnInput !== null && titleInput !== null) ||
      (isbnInput !== null && authorInput !== null)
    ) {
      apiLink += `+isbn:${isbnInput}`;
    }
    fetch(`${apiLink}&key=${key}`)
      .then((data) => data.json())
      .then((res) =>
        res.items
          .slice(0, 15)
          .map((book) => book.volumeInfo)
          .filter((test) => test.industryIdentifiers !== undefined),
      )
      .then((res) => setBooks(res))
      .catch((err) => console.log(err));
  }

  function extractISBN13(arr) {
    const filtered = arr.filter((elem) => elem.identifier.length >= 13);
    return filtered[0].identifier;
  }

  function InsertBookInDb(item) {
    const BookInfo = {
      title: item.title,
      authors: item.authors,
      ISBN: extractISBN13(item.industryIdentifiers),
      publisher: item.publisher,
      thumbnail: item.imageLinks.thumbnail,
      publishedDate: item.publishedDate,
    };

    fetch(`${BASE_URL}:${SERVER_PORT}/books/${user.id}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(BookInfo),
    })
      .then(() =>
        fetch(
          `${BASE_URL}:${SERVER_PORT}/isbn/${user.id}/${BookInfo.ISBN}/buy`,
          {
            method: 'POST',
          },
        ),
      )
      .catch((err) => console.log(err))
      .then(navigation.navigate('Inserted Successfully'));
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

export default SelectFromInputWL;

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
