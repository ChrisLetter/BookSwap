import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../AuthContext';
import { BASE_URL, SERVER_PORT } from '@env';
import BookCard from '../../components/BookCard';
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
import AppLoading from 'expo-app-loading';
import { Button } from 'react-native-paper';

const RequestDetails = ({ route, navigation }) => {
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
  const { request } = route.params;
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();

  function rejectOffer() {
    fetch(
      `${BASE_URL}:${SERVER_PORT}/requests/${request.userFrom}/${request.userTo}/sender/true`,
      {
        method: 'PUT',
      },
    )
      .then(() =>
        fetch(
          `${BASE_URL}:${SERVER_PORT}/requests/${request.userTo}/${request.userFrom}/receiver`,
          {
            method: 'DELETE',
          },
        ),
      )
      .then(() =>
        fetch(
          `${BASE_URL}:${SERVER_PORT}/requests/${request.userFrom}/${request.userTo}/rejected/sender/status`,
          {
            method: 'PUT',
          },
        ),
      )
      .then(() => navigation.navigate('All Requests'))
      .then(() => navigation.navigate('Best Matches'))
      .catch((err) => console.log(err));
  }

  function acceptOffer() {
    const messageUserFrom = {
      userFrom: 'startingMessage',
      userTo: 'startingMessage',
      content:
        'Your request has been accepted! Discuss with the user the details for concluding the deal',
      timeStamp: Date.now(),
    };
    const messageUserTo = {
      userFrom: 'startingMessage',
      userTo: 'startingMessage',
      content:
        'You accepted the request! Discuss with the user the details for concluding the deal',
      timeStamp: Date.now(),
    };
    fetch(
      `${BASE_URL}:${SERVER_PORT}/requests/${request.userFrom}/${request.userTo}/inProgress/sender/status`,
      {
        method: 'PUT',
      },
    )
      .then(() =>
        fetch(
          `${BASE_URL}:${SERVER_PORT}/requests/${request.userTo}/${request.userFrom}/inProgress/receiver/status`,
          {
            method: 'PUT',
          },
        ),
      )
      .then(() =>
        fetch(
          `${BASE_URL}:${SERVER_PORT}/messages/${request.userFrom}/${user.id}/${request.userToUsername}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageUserFrom),
          },
        ),
      )
      .then(() => {
        fetch(
          `${BASE_URL}:${SERVER_PORT}/messages/${user.id}/${request.userFrom}/${request.userFromUsername}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageUserTo),
          },
        );
      })
      .then(() => {
        fetch(
          `${BASE_URL}:${SERVER_PORT}/messages/${request.userFrom}/${user.id}/true/notification`,
          {
            method: 'PUT',
          },
        );
      })
      .then(() => {
        fetch(
          `${BASE_URL}:${SERVER_PORT}/messages/${user.id}/${request.userFrom}/true/notification`,
          {
            method: 'PUT',
          },
        );
      })
      .then(() => navigation.navigate('RequestAccepted'))
      .catch((err) => console.log(err));
  }

  function deleteRequestForMaker() {
    fetch(
      `${BASE_URL}:${SERVER_PORT}/requests/${request.userFrom}/${request.userTo}/sender`,
      {
        method: 'DELETE',
      },
    )
      .then(() => navigation.navigate('All Requests'))
      .then(() => navigation.navigate('Best Matches'));
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={styles.container}>
        {console.log(request)}
        {request.status === 'rejected' ? (
          <View>
            <Text style={styles.mainHeaders}>
              Your request has been rejected
            </Text>
            <Button
              mode="contained"
              onPress={() => deleteRequestForMaker()}
              style={styles.buttonRefuse2}
              labelStyle={{ fontSize: 16 }}
            >
              delete the request
            </Button>
          </View>
        ) : null}
        {request.userFrom === user.id ? (
          <View>
            <Text style={styles.mainHeaders}>You offered these books</Text>
            <FlatList
              data={request.booksOffered}
              keyExtractor={(element) => element.ISBN}
              renderItem={({ item }) => <BookCard bookObj={item} />}
              style={styles.bookCardContainer}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.mainHeaders}>
              {' '}
              {request.userFromUsername} asked these books
            </Text>
            <FlatList
              data={request.booksAsked}
              keyExtractor={(element) => element.ISBN}
              renderItem={({ item }) => <BookCard bookObj={item} />}
              style={styles.bookCardContainer}
            />
          </View>
        )}
        {request.userFrom !== user.id ? (
          <View>
            <Text style={styles.mainHeaders}>
              {request.userFromUsername} offered you these books
            </Text>
            <FlatList
              data={request.booksOffered}
              keyExtractor={(element) => element.ISBN}
              renderItem={({ item }) => <BookCard bookObj={item} />}
              style={styles.bookCardContainer}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.mainHeaders}>You asked for these books</Text>
            <FlatList
              data={request.booksAsked}
              keyExtractor={(element) => element.ISBN}
              renderItem={({ item }) => <BookCard bookObj={item} />}
              style={styles.bookCardContainer}
            />
          </View>
        )}
        {request.userFrom === user.id ? (
          <View>
            {request.comment !== null ? (
              <Text style={styles.commentHeaders}>You left this comment:</Text>
            ) : null}
            <Text style={styles.comment}>{request.comment}</Text>
          </View>
        ) : (
          <View>
            {request.comment !== null ? (
              <Text style={styles.commentHeaders}>
                {request.userFromUsername} left this comment:
              </Text>
            ) : null}
            <Text style={styles.comment}>{request.comment}</Text>
          </View>
        )}
        {request.userFrom === user.id ? (
          <View>
            {request.monetaryCompensation ? (
              <Text style={styles.offeringText}>
                You offered {request.monetaryCompensationValue} $
              </Text>
            ) : null}
          </View>
        ) : (
          <View>
            {request.monetaryCompensation ? (
              <Text style={styles.offeringText}>
                {request.userFromUsername} offered you{' '}
                {request.monetaryCompensationValue} $
              </Text>
            ) : null}
          </View>
        )}
        {request.userFrom !== user.id && request.status === 'pending' ? (
          <View>
            <Button
              mode="contained"
              onPress={() => rejectOffer()}
              style={styles.buttonRefuse}
              labelStyle={{ fontSize: 16 }}
            >
              Reject the offer
            </Button>
            <Button
              mode="contained"
              onPress={() => acceptOffer()}
              style={styles.buttonAccept}
              labelStyle={{ fontSize: 16 }}
            >
              Accept the offer
            </Button>
          </View>
        ) : null}
      </ScrollView>
    );
  }
};

export default RequestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainHeaders: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  bookCardContainer: {
    paddingBottom: 40,
  },
  comment: {
    fontFamily: 'Rosario_500Medium_Italic',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  commentHeaders: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 18,
    textAlign: 'center',
  },
  offeringText: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 20,
  },
  buttonRefuse: {
    marginHorizontal: 20,
    backgroundColor: '#AA336A',
    marginTop: 20,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonRefuse2: {
    marginHorizontal: 20,
    backgroundColor: '#AA336A',
    marginTop: 20,
    marginBottom: 40,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonAccept: {
    marginHorizontal: 20,
    backgroundColor: '#5D3FD3',
    marginTop: 20,
    marginBottom: 40,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },
});
