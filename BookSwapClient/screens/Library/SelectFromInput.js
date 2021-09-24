import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { UserContext } from '../../AuthContext';
import { Image } from 'react-native-elements';

import secretKey from '../../ignoredFileReact';
import BASE_URL from '../../configClient';

const SelectFromInput = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const { title, authors, isbn } = route.params.FormInfo;
  const [books, setBooks] = useState(null);

  useEffect(() => {
    fetchBookFromUserInput(title, authors, isbn, secretKey.ApiKey);
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

    fetch(`${BASE_URL}/books/${user.id}/library`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(BookInfo),
    });
    // .then(() =>
    //   fetch(`${BASE_URL}/isbn/${user.id}/${BookInfo.ISBN}/sell`, {
    //     method: 'POST',
    //   }),
    // )
    // .catch((err) => console.log(err))
    // .then(navigation.navigate('ScannedSuccessfully'));
  }

  return (
    <View style={styles.container}>
      <Text style={{ paddingBottom: 30 }}>test SelectBookFromInput</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => extractISBN13(item.industryIdentifiers)}
        renderItem={({ item }) => (
          <View style={styles.wholeResult}>
            {item.imageLinks ? (
              <View style={{ width: 120, height: 192 }}>
                <Image
                  source={{ uri: item.imageLinks.thumbnail }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            ) : null}
            <View>
              <Text>{item.title}</Text>
              <Text>{item.authors}</Text>
              <Text>{item.publisher}</Text>
              <Text>{item.publishedDate}</Text>
              <Text>{extractISBN13(item.industryIdentifiers)}</Text>
              <Button
                onPress={() => InsertBookInDb(item)}
                title="Add it to my librabry"
                color="#841584"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SelectFromInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wholeResult: {
    flexDirection: 'row',
    margin: 10,
  },
});
