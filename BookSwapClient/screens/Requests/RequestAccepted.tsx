import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RequestsStackParamList } from './../../interfaces/types';

type Props = NativeStackScreenProps<RequestsStackParamList, 'RequestAccepted'>;

const RequestAccepted = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <View style={styles.lottieContainer}>
        <LottieView
          style={styles.lottie}
          source={require('./../../assets/handshake.json')}
          autoPlay
          loop={true}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Chat')}
        style={styles.buttonGoToChat}
        labelStyle={styles.label}
      >
        go to the chat
      </Button>
    </SafeAreaView>
  );
};

export default RequestAccepted;

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    alignItems: 'center',
  },
  lottie: {
    paddingTop: 0,
    height: 350,
  },
  buttonGoToChat: {
    marginHorizontal: 20,
    backgroundColor: '#5D3FD3',
    marginTop: 460,
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
