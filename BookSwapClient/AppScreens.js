import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserContext } from './AuthContext';

import Login from './screens/Authentication/Login';
import Register from './screens/Authentication/Register';
import UserLibrary from './screens/Library/UserLibrary';
import WhishList from './screens/WhishList/WhishList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function firstComponent() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserLibrary" component={UserLibrary} />
      <Stack.Screen name="WhishList" component={WhishList} />
    </Stack.Navigator>
  );
}

export default function AppScreens() {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {!user.auth ? (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="firstComponent" component={firstComponent} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
