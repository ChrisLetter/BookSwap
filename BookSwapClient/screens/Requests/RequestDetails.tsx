import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { UserContext } from '../../AuthContext';
import BookCard from '../../components/BookCard';
import {
  useFonts,
  Rosario_500Medium,
  Rosario_500Medium_Italic,
} from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';
import { Button } from 'react-native-paper';
import apiService from '../../ApiService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RequestsStackParamList } from './../../interfaces/types';

type Props = NativeStackScreenProps<
  RequestsStackParamList,
  'Details of the Request'
>;

const RequestDetails = ({ route, navigation }: Props) => {
  const [fontsLoaded] = useFonts({
    Rosario_500Medium,
    Rosario_500Medium_Italic,
  });
  const { request } = route.params;
  const { user } = useContext(UserContext);

  async function rejectOffer() {
    await apiService.removeNotificationBadgeSender(request, 'true');
    await apiService.deleteRequest(request);
    await apiService
      .changeStatusRequestSender(request, 'rejected')
      .then(() => navigation.navigate('All Requests'));
  }

  async function acceptOffer() {
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
    await apiService.changeStatusRequestSender(request, 'inProgress');
    await apiService.changeStatusRequestReceiver(request, 'inProgress');
    await apiService.sendStartingMessageSender(
      request,
      user.id,
      messageUserFrom,
    );
    await apiService.sendStartingMessageReceiver(
      request,
      user.id,
      messageUserTo,
    );
    await apiService.toggleNotificationMessage(
      request.userFrom,
      user.id,
      'true',
    );
    await apiService
      .toggleNotificationMessage(user.id, request.userFrom, 'true')
      .then(() => navigation.navigate('RequestAccepted'));
  }

  async function deleteRequestForMaker() {
    await apiService
      .deleteRequestSender(request)
      .then(() => navigation.navigate('All Requests'));
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
              labelStyle={styles.label}
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
              labelStyle={styles.label}
            >
              Reject the offer
            </Button>
            <Button
              mode="contained"
              onPress={() => acceptOffer()}
              style={styles.buttonAccept}
              labelStyle={styles.label}
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
  label: {
    fontSize: 16,
  },
});
