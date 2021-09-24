import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';

const UserLibrary = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState(null);
  const isFocused = useIsFocused();

  function fetchBookFromDb() {
    fetch(`${BASE_URL}/books/${user.id}/library`)
      .then((data) => data.json())
      .then((res) => setBooks(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isFocused) fetchBookFromDb();
  }, [isFocused]);

  function removeBook(isbn) {
    fetch(`${BASE_URL}/books/${user.id}/${isbn}/library`, {
      method: 'DELETE',
    });
  }
  //     .then(() =>
  //       fetch(`${BASE_URL}/isbn/${user.id}/${isbn}/sell`, {
  //         method: 'DELETE',
  //       }),
  //     )
  //     .then(() => fetchBookFromDb());
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.ISBN}
        renderItem={({ item }) => (
          <View style={styles.wholeResult}>
            {item.thumbnail ? (
              <View style={{ width: 120, height: 192 }}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            ) : null}
            <View>
              <Text>{item.title}</Text>
              <Text>{item.authors}</Text>
              <Text>{item.publisher}</Text>
              <Text>{item.publishedDate}</Text>
              <Text>{item.ISBN}</Text>
              <TouchableOpacity onPress={() => removeBook(item.ISBN)}>
                <Text>Remove the book</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <IconButton
        style={styles.plusButton}
        icon="plus-circle"
        color={Colors.green500}
        size={70}
        onPress={() => navigation.navigate('Insert A New Book')}
      />
    </View>
  );
};

export default UserLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  plusButton: {
    position: 'absolute',
    top: '82%',
    left: '70%',
  },
  wholeResult: {
    flexDirection: 'row',
    margin: 10,
  },
});
