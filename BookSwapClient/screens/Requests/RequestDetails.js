import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';

const RequestDetails = ({ route, navigation }) => {
  const { request } = route.params;
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();

  function rejectOffer() {
    fetch(
      `${BASE_URL}/requests/${request.userFrom}/${request.userTo}/sender/true`,
      {
        method: 'PUT',
      },
    )
      .then(() =>
        fetch(
          `${BASE_URL}/requests/${request.userTo}/${request.userFrom}/receiver`,
          {
            method: 'DELETE',
          },
        ),
      )
      .then(() =>
        fetch(
          `${BASE_URL}/requests/${request.userFrom}/${request.userTo}/rejected/sender/status`,
          {
            method: 'PUT',
          },
        ),
      )
      .catch((err) => console.log(err));
  }

  function acceptOffer() {
    const message = {
      userFrom: 'startingMessage',
      userTo: 'startingMessage',
      content: 'in this chat you can discuss the details of your exchange',
      timeStamp: Date.now(),
    };
    fetch(
      `${BASE_URL}/requests/${request.userFrom}/${request.userTo}/inProgress/sender/status`,
      {
        method: 'PUT',
      },
    )
      .then(() =>
        fetch(
          `${BASE_URL}/requests/${request.userTo}/${request.userFrom}/inProgress/receiver/status`,
          {
            method: 'PUT',
          },
        ),
      )
      .then(() =>
        fetch(`${BASE_URL}/messages/${request.userFrom}/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        }),
      )
      .then(() => {
        fetch(`${BASE_URL}/messages/${user.id}/${request.userFrom}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      })
      .then(() => navigation.navigate('Messages'))
      .catch((err) => console.log(err));
  }

  function deleteRequestForMaker() {
    fetch(`${BASE_URL}/requests/${request.userFrom}/${request.userTo}/sender`, {
      method: 'DELETE',
    }).then(() => navigation.navigate('Best Matches'));
  }

  return (
    <ScrollView>
      {console.log(request)}
      {request.status === 'rejected' ? (
        <View>
          <Text>Your request has been rejected</Text>
          <Button
            onPress={() => deleteRequestForMaker()}
            title="Press here to delete the request"
            color="#841584"
          />
        </View>
      ) : null}
      {request.userFrom === user.id ? (
        <View>
          <Text>You'll have to give to the user these books</Text>
          <FlatList
            data={request.booksOffered}
            keyExtractor={(element) => element.ISBN}
            renderItem={({ item }) => (
              <View>
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
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          <Text>Pinco Pallino will give you these books</Text>
          <FlatList
            data={request.booksAsked}
            keyExtractor={(element) => element.ISBN}
            renderItem={({ item }) => (
              <View>
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
                </View>
              </View>
            )}
          />
        </View>
      )}
      {request.userFrom !== user.id ? (
        <View>
          <Text>You'll have to give to the user these books</Text>
          <FlatList
            data={request.booksOffered}
            keyExtractor={(element) => element.ISBN}
            renderItem={({ item }) => (
              <View>
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
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          <Text>Pinco Pallino will give you these books</Text>
          <FlatList
            data={request.booksAsked}
            keyExtractor={(element) => element.ISBN}
            renderItem={({ item }) => (
              <View>
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
                </View>
              </View>
            )}
          />
        </View>
      )}
      {request.userFrom === user.id ? (
        <View>
          {request.comment !== null ? (
            <Text>You left this comment:</Text>
          ) : null}
          <Text>{request.comment}</Text>
        </View>
      ) : (
        <View>
          {request.comment !== null ? (
            <Text>Pinco Pallino left this comment:</Text>
          ) : null}
          <Text>{request.comment}</Text>
        </View>
      )}
      {request.userFrom === user.id ? (
        <View>
          {request.monetaryCompensation ? (
            <Text>You offered {request.monetaryCompensationValue} $</Text>
          ) : null}
        </View>
      ) : (
        <View>
          {request.monetaryCompensation ? (
            <Text>
              Pinco Pallino offered you {request.monetaryCompensationValue} $
            </Text>
          ) : null}
        </View>
      )}
      {request.status === 'inProgress' ? (
        <View>
          <Text>Add Button for deleting the request and all the books</Text>
        </View>
      ) : null}
      {request.userFrom !== user.id && request.status === 'pending' ? (
        <View>
          <Button
            onPress={() => acceptOffer()}
            title="Open the chat"
            color="#841584"
          />
          <Button
            onPress={() => rejectOffer()}
            title="Reject"
            color="#841584"
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

export default RequestDetails;
