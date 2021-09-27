import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import secretKey from '../../ignoredFileReact';
import BASE_URL from '../../configClient';
import { UserContext } from '../../AuthContext';
import BookCard from '../../components/BookCard';
import { Button } from 'react-native-paper';
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

const ConfirmIsbnScan = ({ route, navigation }) => {
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
  const { scannedISBN } = route.params;
  const [book, setBook] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchBookFromISBN(scannedISBN, secretKey.ApiKey);
  }, [scannedISBN]);

  function fetchBookFromISBN(ISBN, key) {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}&key=${key}`,
    )
      .then((data) => data.json())
      .then((res) => setBook(res.items[0].volumeInfo))
      .catch((err) => console.log(err));
  }

  function InsertBookInDb() {
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : null;
    const BookInfo = {
      title: book.title,
      authors: book.authors,
      ISBN: scannedISBN,
      publisher: book.publisher,
      thumbnail: thumbnail,
      publishedDate: book.publishedDate,
    };

    fetch(`${BASE_URL}/books/${user.id}/library`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(BookInfo),
    })
      .then(() =>
        fetch(`${BASE_URL}/isbn/${user.id}/${BookInfo.ISBN}/sell`, {
          method: 'POST',
        }),
      )
      .catch((err) => console.log(err))
      .then(navigation.navigate('Book Added Successfully'));
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {book ? (
          <View style={styles.container}>
            <Text style={styles.header}>Is this the right book?</Text>
            <BookCard bookObj={book} />
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Insert A New Book')}
              style={styles.buttonSearchManually}
              labelStyle={{ fontSize: 16 }}
            >
              no, search manually
            </Button>
            <Button
              mode="contained"
              onPress={() => InsertBookInDb()}
              style={styles.buttonAddToLibrary}
              labelStyle={{ fontSize: 16 }}
            >
              Yes, Add to the library
            </Button>
          </View>
        ) : null}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 40,
  },
  buttonSearchManually: {
    marginHorizontal: 20,
    backgroundColor: '#AA336A',
    marginTop: 130,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonAddToLibrary: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#5D3FD3',
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default ConfirmIsbnScan;
