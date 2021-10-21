import React from 'react';
import AppScreens from './AppScreens';
import { UserProvider } from './AuthContext';
// import { LogBox } from 'react-native';

export default function App() {
  // LogBox.ignoreAllLogs();
  // for recording the video, I am going to ignore all the logs

  return (
    <UserProvider>
      <AppScreens />
    </UserProvider>
  );
}
