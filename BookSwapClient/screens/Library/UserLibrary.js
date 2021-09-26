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
import AppLoading from 'expo-app-loading';
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

import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';

const UserLibrary = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState(null);
  const isFocused = useIsFocused();
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
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={books}
          keyExtractor={(item) => item.ISBN}
          renderItem={({ item }) => (
            <View style={styles.test}>
              <LinearGradient
                colors={['#A73FD3', '#5D3FD3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.wholeResult}
              >
                {item.thumbnail ? (
                  <View
                    style={{
                      width: 90,
                      height: 144,
                      borderRadius: 10,
                      shadowColor: '#000',
                      shadowOffset: { width: 1, height: 2 },
                      shadowOpacity: 0.9,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                  >
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                ) : null}
                <View style={styles.textContainer}>
                  <Text style={styles.textTitle}>{item.title}</Text>
                  <Text style={styles.textAuthor}>{item.authors}</Text>
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
          icon="plus"
          color={Colors.white}
          size={70}
          onPress={() => navigation.navigate('Insert A New Book')}
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
  }
};

export default UserLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradientContainer: {
    flex: 1,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  plusButton: {
    position: 'absolute',
    top: '85%',
    left: '76%',
  },
  test: {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  wholeResult: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    padding: 4,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 2,
    borderRadius: 10,
  },
  textTitle: {
    color: 'white',
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 20,
    fontFamily: 'Rosario_500Medium',
  },
  textAuthor: {
    color: 'white',
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'Rosario_300Light_Italic',
  },
});
