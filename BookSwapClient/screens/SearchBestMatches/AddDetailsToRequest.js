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
import { Picker } from '@react-native-picker/picker';

import { UserContext } from '../../AuthContext';
import BASE_URL from '../../configClient';

const AddDetailsToRequest = ({ route, navigation }) => {
  const { user } = useContext(UserContext);

  const { matchesFromWishList, matchesFromLibraryToSell, UserMatch } =
    route.params;
  const [monetaryCompensationYesOrNo, setMonetaryCompensationYesOrNo] =
    useState(false);
  const [AskOrGiveMoney, setAskOrGiveMoney] = useState('true');
  const [monetaryCompensationValue, setMonetaryCompensationValue] = useState(0);
  const [comment, setComment] = useState(null);

  function sendRequest() {
    const requestFromUser = {
      userFrom: user.id,
      userTo: UserMatch,
      hasBeenViewed: false,
      booksOffered: matchesFromLibraryToSell,
      booksAsked: matchesFromWishList,
      monetaryCompensation: monetaryCompensationYesOrNo,
      monetaryCompensationValue: monetaryCompensationValue,
      askingMoney: AskOrGiveMoney,
      comment: comment,
      status: 'pending',
      timeStamp: Date.now(),
    };
    fetch(`${BASE_URL}/requests/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestFromUser),
    })
      .then(() => {
        fetch(`${BASE_URL}/requests/${UserMatch}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestFromUser),
        });
      })
      .catch((err) => console.log(err))
      .then(navigation.navigate('Request Sent'));
  }

  return (
    <View>
      {monetaryCompensationYesOrNo === true ? (
        <View>
          <Picker
            selectedValue={AskOrGiveMoney}
            onValueChange={(itemValue) => setAskOrGiveMoney(itemValue)}
          >
            <Picker.Item label="AskFor" value={true} />
            <Picker.Item label="Give" value={false} />
          </Picker>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'grey' }}
            value={monetaryCompensationValue}
            onChangeText={setMonetaryCompensationValue}
            keyboardType="numeric"
          />
        </View>
      ) : (
        <View>
          <Text>
            Press the button below to offer or ask for a monetary compensation
            for this exchange? (Optional)
          </Text>
          <View>
            <Button
              onPress={() => setMonetaryCompensationYesOrNo(true)}
              title="Ask/Give Monetary Compensation"
              color="#841584"
            />
          </View>
        </View>
      )}
      <Text>Add some comments</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey', marginTop: 10 }}
        value={comment}
        onChangeText={setComment}
        keyboardType="numeric"
      />
      <Button
        onPress={() => sendRequest()}
        title="Send the Request"
        color="#841584"
      />
    </View>
  );
};

export default AddDetailsToRequest;
