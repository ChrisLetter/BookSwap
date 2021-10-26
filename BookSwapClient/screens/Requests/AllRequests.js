import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../AuthContext';
import DisplaySingleRequest from '../../components/displaySingleRequest';
import apiService from './../../ApiService';

const AllRequests = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [madeRequests, setMadeRequests] = useState([]);

  useEffect(() => {
    async function controlForRequests(userId) {
      const response = await apiService.getRequests(userId);
      const filteredIncomingRequests = response.filter(
        (request) => request.userFrom !== user.id,
      );
      const filteredMadeRequests = response.filter(
        (request) => request.userFrom === user.id,
      );
      setIncomingRequests(filteredIncomingRequests);
      setMadeRequests(filteredMadeRequests);
    }
    controlForRequests(user.id);
  }, [isFocused, user.id]);

  function removeNotificationBadgeReceiver(req) {
    if (!req.hasBeenViewed) {
      apiService.removeNotificationBadgeReceiver(req);
    }
  }

  function removeNotificationBadgeSender(req) {
    if (req.hasBeenViewed) {
      apiService.removeNotificationBadgeSender(req, 'false');
    }
  }

  return (
    <ScrollView style={styles.container}>
      {incomingRequests.map((req) => (
        <DisplaySingleRequest
          info={req}
          pressing={() => {
            removeNotificationBadgeReceiver(req);
            navigation.navigate('Details of the Request', {
              request: req,
            });
          }}
          key={req.timeStamp}
        />
      ))}
      {madeRequests.map((req) => (
        <DisplaySingleRequest
          info={req}
          user={user.id}
          pressing={() => {
            removeNotificationBadgeSender(req);
            navigation.navigate('Details of the Request', {
              request: req,
            });
          }}
          key={req.timeStamp}
        />
      ))}
    </ScrollView>
  );
};

export default AllRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
