import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../AuthContext';
import DisplaySingleRequest from '../../components/displaySingleRequest';
import apiService from '../../ApiService';
import { IRequest } from '../../interfaces/interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RequestsStackParamList } from './../../interfaces/types';

type Props = NativeStackScreenProps<RequestsStackParamList, 'All Requests'>;

const AllRequests = ({ navigation }: Props) => {
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [madeRequests, setMadeRequests] = useState([]);

  useEffect(() => {
    async function controlForRequests(userId: string) {
      const response = await apiService.getRequests(userId);
      const filteredIncomingRequests = response.filter(
        (request: IRequest) => request.userFrom !== user.id,
      );
      const filteredMadeRequests = response.filter(
        (request: IRequest) => request.userFrom === user.id,
      );
      setIncomingRequests(filteredIncomingRequests);
      setMadeRequests(filteredMadeRequests);
    }
    controlForRequests(user.id);
  }, [isFocused, user.id]);

  function removeNotificationBadgeReceiver(req: IRequest) {
    if (!req.hasBeenViewed) {
      apiService.removeNotificationBadgeReceiver(req);
    }
  }

  function removeNotificationBadgeSender(req: IRequest) {
    if (req.hasBeenViewed) {
      apiService.removeNotificationBadgeSender(req, 'false');
    }
  }

  return (
    <ScrollView style={styles.container}>
      {incomingRequests.map((req: IRequest) => (
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
      {madeRequests.map((req: IRequest) => (
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
