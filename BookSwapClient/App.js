import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppScreens from './AppScreens';
import { UserProvider } from './AuthContext';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs();
  // for recording the video, I am going to ignore all the logs

  return (
    <UserProvider>
      <AppScreens />
    </UserProvider>
  );
}
