import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import secretKey from '../../ignoredFileReact';
import BASE_URL from '../../configClient';
import { UserContext } from '../../AuthContext';

const ConfirmIsbnScan = ({ route, navigation }) => {
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
    });
    // .then(() =>
    // fetch(`${BASE_URL}/isbn/${user.id}/${BookInfo.ISBN}/sell`, {
    // method: 'POST',
    // }),
    // )
    // .catch((err) => console.log(err))
    // .then(navigation.navigate('ScannedSuccessfully'));
    // }
    //
  }

  return (
    <View style={styles.container}>
      <Text>Is this the book you are looking for?</Text>
      {book !== null ? <Text>{book.title}</Text> : null}
      {book !== null ? <Text>{book.authors}</Text> : null}
      {book !== null ? <Text>{scannedISBN}</Text> : null}
      {book !== null && book.publisher !== undefined ? (
        <Text>{console.log(book.publisher)}</Text>
      ) : (
        <Text>Unknown</Text>
      )}
      {book !== null ? <Text>{book.publishedDate.slice(0, 4)}</Text> : null}
      <View style={{ width: 120, height: 192 }}>
        {book && book.imageLinks ? (
          <Image
            source={{ uri: book.imageLinks.thumbnail }}
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
      </View>
      <TouchableOpacity
        style={{ paddingBottom: 30 }}
        onPress={() => InsertBookInDb()}
      >
        <Text>Yes, add it to my library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Insert A New Book')}
      >
        <Text>No, search manually</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ConfirmIsbnScan;
