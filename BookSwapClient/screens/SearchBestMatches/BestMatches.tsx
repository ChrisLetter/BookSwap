import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import LoadingSearching from '../../components/LoadingSearching';
import apiService from '../../ApiService';
import { useFonts, Rosario_500Medium } from '@expo-google-fonts/rosario';
import { UserContext } from '../../AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BestMatchesStackParamList } from './../../interfaces/types';
import { IAllBooks } from './../../interfaces/interfaces';

type Props = NativeStackScreenProps<BestMatchesStackParamList, 'Best Matches'>;

const BestMatches = ({ navigation }: Props) => {
  const intialAllBooks: IAllBooks = {
    booksToBuy: [],
    booksToSell: [],
  };
  const [fontsLoaded] = useFonts({ Rosario_500Medium });
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();
  const [allBooksCurrentUser, setAllBooksCurrentUser] =
    useState(intialAllBooks);
  const [matchesFound, setMatchesFound] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchBooksFromDb() {
      let response = await apiService.getUserBooks(user.id, 'all');
      setAllBooksCurrentUser(response);
    }
    fetchBooksFromDb();

    async function findBestMatches() {
      const { sorted } = await apiService.getBestMatches(user.id);
      setMatchesFound(sorted);
    }
    findBestMatches();
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isFocused, user.id]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {!isLoading ? (
          <View style={styles.container}>
            {matchesFound.length > 0 ? (
              <FlatList
                data={matchesFound}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Send Request', {
                        UsersInfo: {
                          booksCurrUser: allBooksCurrentUser,
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
