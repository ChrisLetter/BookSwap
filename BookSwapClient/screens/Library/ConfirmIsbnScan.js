import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { REACT_APP_API_KEY } from '@env';
import { UserContext } from '../../AuthContext';
import BookCard from '../../components/BookCard';
import { Button } from 'react-native-paper';
import { useFonts, Rosario_500Medium } from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';
import apiService from './../../ApiService';

const ConfirmIsbnScan = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({ Rosario_500Medium });
  const { scannedISBN } = route.params;
  const [book, setBook] = useState(null);
  const { user } = useContext(UserContext);

  async function fetchBookFromISBN(ISBN, key) {
    const bookFromGoogle = await apiService.searchBooksByIsbnGoogle(ISBN, key);
    setBook(bookFromGoogle.items[0].volumeInfo);
  }

  useEffect(() => {
    fetchBookFromISBN(scannedISBN, REACT_APP_API_KEY);
  }, [scannedISBN]);

  async function InsertBookInDb() {
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : null;
    const BookInfo = {
      title: book.title,
      authors: book.authors,
      ISBN: scannedISBN,
      publisher: book.publisher,
      thumbnail: thumbnail,
      publishedDate: book.publishedDate,
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
        {book ? (
          <View style={styles.container}>
            <Text style={styles.header}>Is this the right book?</Text>
            <BookCard bookObj={book} />
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Insert A New Book')}
              style={styles.buttonSearchManually}
              labelStyle={styles.label}
            >
              no, search manually
            </Button>
            <Button
              mode="contained"
              onPress={() => InsertBookInDb()}
              style={styles.buttonAddToLibrary}
              labelStyle={styles.label}
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
  label: {
    fontSize: 16,
  },
});

export default ConfirmIsbnScan;
