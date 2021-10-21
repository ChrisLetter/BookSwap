import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';
import BookCard from '../../components/BookCard';
import {
  useFonts,
  Rosario_400Regular_Italic,
} from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';

const UserLibrary = ({ navigation }) => {
  const [fontsLoaded] = useFonts({ Rosario_400Regular_Italic });
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
    fetchBookFromDb();
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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Add here the book that you would like to get rid of
        </Text>
        <FlatList
          data={books}
          keyExtractor={(item) => item.ISBN}
          renderItem={({ item }) => (
            <BookCard bookObj={item} removeBtn={() => removeBook(item.ISBN)} />
          )}
        />
        <IconButton
          /* here I am inserting two buttons since the one that I want to use has a
          cross in the middle, which is not filled with any colors, therefore the
          background is visible in the middle of the button. I placed a similar white
          button underneath the one that I want to use, so that it covers the background*/
          style={styles.plusButton}
          icon="plus"
          color={Colors.white}
          size={65}
          onPress={() => navigation.navigate('Insert A New Book')}
        />
        <IconButton
          style={styles.plusButton}
          icon="plus-circle"
          color={Colors.lightGreenA700}
          size={65}
          onPress={() => navigation.navigate('Insert A New Book')}
        />
      </View>
    );
  }
};

export default UserLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  plusButton: {
    position: 'absolute',
    top: '85%',
    left: '76%',
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Rosario_400Regular_Italic',
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 70,
  },
});
