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

const WishList = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();
  const [books, setBooks] = useState(null);

  function fetchBookFromDb() {
    fetch(`${BASE_URL}/books/${user.id}/wishList`)
      .then((data) => data.json())
      .then((res) => setBooks(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isFocused) fetchBookFromDb();
  }, [isFocused]);

  // function removeBook(isbn) {
  //   fetch(`${ipAddressForFetching}/books/${UserId}/${isbn}/buy`, {
  //     method: 'DELETE',
  //   })
  //     .then(() =>
  //       fetch(`${ipAddressForFetching}/isbn/${UserId}/${isbn}/buy`, {
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
        onPress={() => navigation.navigate('Add a New Book')}
      />
    </View>
  );
};

export default WishList;

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
