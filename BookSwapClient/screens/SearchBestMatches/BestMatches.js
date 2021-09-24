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

import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';

const BestMatches = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const isFocused = useIsFocused();
  const [userBooksLibrary, setUserBooksLibrary] = useState([]);
  const [allBooksCurrentUser, setAllBooksCurrentUser] = useState([]);
  const [userBooksWishList, setUserBooksWishList] = useState([]);
  const [ISBNfromDB, setISBNfromDB] = useState([]);
  const [matchesFound, setMatchesFound] = useState(null);

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
    setMatchesFound(sorted);
  }

  return (
    <View>
      <Text> Search page</Text>
      <FlatList
        data={matchesFound}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View>
            {item ? (
              <View>
                <Text>
                  User {item[0]} has {item[1]} books
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MatchesDetailPage', {
                      UsersInfo: {
                        booksCurrUser: allBooksCurrentUser,
                        userBooksLibrary,
                        userBooksWishList,
                        UserMatch: item[0],
                      },
                    })
                  }
                >
                  <Text> Search</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      />
    </View>
  );
};

export default BestMatches;
