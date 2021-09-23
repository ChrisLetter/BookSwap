import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppScreens from './AppScreens';
import { UserProvider } from './AuthContext';

export default function App() {
  return (
    <UserProvider>
      <AppScreens />
    </UserProvider>
  );
}
