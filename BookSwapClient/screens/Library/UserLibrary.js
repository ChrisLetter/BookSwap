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
import { LinearGradient } from 'expo-linear-gradient';

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
    })
      .then(() =>
        fetch(`${BASE_URL}/isbn/${user.id}/${isbn}/sell`, {
          method: 'DELETE',
        }),
      )
      .then(() => fetchBookFromDb());
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.ISBN}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <LinearGradient
              colors={['#2471A3', '#8e44ad']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 1 }}
              style={styles.wholeResult}
            >
              {item.thumbnail ? (
                <View
                  style={{
                    width: 100,
                    height: 160,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.9,
                    shadowRadius: 3,
                    elevation: 5,
                  }}
                >
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      justifySelf: 'start',
                    }}
                  />
                </View>
              ) : null}
              <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{item.title}</Text>
                <Text style={styles.textAuthor}>{item.authors}</Text>
                {/* <Text style={styles.text}>{item.publisher}</Text>
              <Text style={styles.text}>{item.publishedDate}</Text>
              <Text style={styles.text}>{item.ISBN}</Text> */}
                {/* <TouchableOpacity onPress={() => removeBook(item.ISBN)}>
                <Text style={styles.text}>Remove the book</Text>
              </TouchableOpacity> */}
              </View>
            </LinearGradient>
          </View>
        )}
      />
      <IconButton
        style={styles.plusButton}
        icon="plus-circle"
        color={Colors.blue800}
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
    backgroundColor: 'white',
  },
  plusButton: {
    position: 'absolute',
    top: '82%',
    left: '70%',
  },
  wholeResult: {
    marginHorizontal: 12,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'violet',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 2,
  },
  text: {
    color: 'black',
    paddingLeft: 25,
  },
  textTitle: {
    color: 'white',
    padding: 15,
    fontSize: 20,
    fontWeight: '700',
  },
  textAuthor: {
    color: 'white',
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '500',
  },
});
