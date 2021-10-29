import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import apiService from '../../ApiService';
import { UserContext } from '../../AuthContext';
import BookCard from '../../components/BookCard';
import {
  useFonts,
  Rosario_400Regular_Italic,
} from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WishListStackParamList } from './../../interfaces/types';

type Props = NativeStackScreenProps<WishListStackParamList, 'Your Wish List'>;

const WishList = ({ navigation }: Props) => {
  const [fontsLoaded] = useFonts({
    Rosario_400Regular_Italic,
  });
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();
  const [books, setBooks] = useState(null);

  async function getBooks(userId: string) {
    const fetchedBooks = await apiService.getUserBooks(userId, 'wishList');
    setBooks(fetchedBooks);
  }

  useEffect(() => {
    getBooks(user.id);
  }, [isFocused, user.id]);

  async function removeBook(isbn: string) {
    await apiService.removeUserBook(user.id, isbn, 'wishList');
    await apiService.removeBookFromISBNList(user.id, isbn, 'buy');
    await getBooks(user.id);
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Add here the book that you would like to read
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
          onPress={() => navigation.navigate('Add a New Book')}
        />
        <IconButton
          style={styles.plusButton}
          icon="plus-circle"
          color={Colors.lightGreenA700}
          size={65}
          onPress={() => navigation.navigate('Add a New Book')}
        />
      </View>
    );
  }
};

export default WishList;

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
