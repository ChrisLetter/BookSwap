import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import LoadingSearching from '../../components/LoadingSearching';

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

const BestMatches = ({ navigation }) => {
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
  const { user } = useContext(UserContext);

  const isFocused = useIsFocused();
  const [userBooksLibrary, setUserBooksLibrary] = useState([]);
  const [allBooksCurrentUser, setAllBooksCurrentUser] = useState([]);
  const [userBooksWishList, setUserBooksWishList] = useState([]);
  const [ISBNfromDB, setISBNfromDB] = useState([]);
  const [matchesFound, setMatchesFound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchBookFromDb() {
    try {
      let response = await fetch(`${BASE_URL}/books/${user.id}/all`);
      let json = await response.json();
      setAllBooksCurrentUser(json);
      let booksToSell = await json.booksToSell
        .map((books) => books.ISBN)
        .filter((whatever) => !userBooksLibrary.includes(whatever));
      let booksWishList = await json.booksToBuy
        .map((books) => books.ISBN)
        .filter((whatever) => !userBooksWishList.includes(whatever));
      booksToSell.map((isbn) =>
        fetch(`${BASE_URL}/isbn/${isbn}`)
          .then((data) => data.json())
          .then((res) => {
            setISBNfromDB((prev) => [...prev, res]);
          })
          .catch((err) => console.log(err)),
      );
      booksWishList.map((isbn) =>
        fetch(`${BASE_URL}/isbn/${isbn}`)
          .then((data) => data.json())
          .then((res) => {
            setISBNfromDB((prev) => [...prev, res]);
          })
          .catch((err) => console.log(err)),
      );
      setUserBooksLibrary((prev) => [...prev, ...booksToSell]);
      setUserBooksWishList((prev) => [...prev, ...booksWishList]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBookFromDb();
  }, [isFocused]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    if (
      ISBNfromDB.length > 0 &&
      ISBNfromDB.length === userBooksWishList.length + userBooksLibrary.length
    ) {
      findBestMatches();
    }
  }, [ISBNfromDB]);

  function findBestMatches() {
    let UsersBuyers = ISBNfromDB.filter((books) =>
      userBooksLibrary.includes(`${books.ISBN}`),
    )
      .map((whatever) => whatever.UsersThatWantIt)
      .reduce((previousValue, currentValue) =>
        previousValue.concat(currentValue),
      );
    let UsersSellers = ISBNfromDB.filter((books) =>
      userBooksWishList.includes(`${books.ISBN}`),
    )
      .map((whatever) => whatever.UsersThatWantToSellIt)
      .reduce((previousValue, currentValue) =>
        previousValue.concat(currentValue),
      );
    const allUsers = UsersBuyers.concat(UsersSellers);
    const freq = {};
    for (let el of allUsers) {
      if (Object.keys(freq).includes(el)) {
        freq[el] += 1;
      } else {
        freq[el] = 1;
      }
    }
    const sorted = Object.entries(freq).sort(([, a], [, b]) => b - a);
    (async function () {
      for (let el of sorted) {
        let response = await fetch(`${BASE_URL}/username/${el[0]}`);
        let json = await response.json();
        el.push(json.username);
      }
      setMatchesFound(sorted);
    })();
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {!isLoading ? (
          <View style={styles.container}>
            {matchesFound !== null && matchesFound.length > 0 ? (
              <FlatList
                data={matchesFound}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Send Request', {
                        UsersInfo: {
                          booksCurrUser: allBooksCurrentUser,
                          userBooksLibrary,
                          userBooksWishList,
                          UserMatch: item[0],
                          Username: item[2],
                        },
                      })
                    }
                    style={styles.cardContainer}
                  >
                    <LinearGradient
                      colors={['#5D3FD3', '#AA336A']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.card}
                    >
                      <Text style={styles.cardText}>
                        You can trade {item[1]} {item[1] > 1 ? 'books' : 'book'}{' '}
                        with {item[2]}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              />
            ) : null}
          </View>
        ) : (
          <LoadingSearching />
        )}
      </View>
    );
  }
};

export default BestMatches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    zIndex: -5,
  },
  card: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 15,
    // margin: 15,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    padding: 6,
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    fontFamily: 'Rosario_500Medium',
    fontSize: 17,
    padding: 20,
  },
});
