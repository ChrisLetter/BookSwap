import React, { useState, useEffect } from 'react';
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

const bookCard = (props) => {
  return (
    <View>
      {props.info?.userFrom === props.user ? (
        <View>
          {props.info?.hasBeenViewed ? <Text> notificatiooooon</Text> : null}
          <Text>You made a request to the user {props.info?.userTo}</Text>
        </View>
      ) : (
        <Text>
          {!props.info?.hasBeenViewed ? <Text> notificatiooooon</Text> : null}
          User {props.info?.userFrom} want your book
        </Text>
      )}
      <TouchableOpacity onPress={props.pressing}>
        <Text>See the details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default bookCard;
