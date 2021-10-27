import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { UserContext } from './AuthContext';

import Login from './screens/Authentication/Login';
import Register from './screens/Authentication/Register';
import UserLibrary from './screens/Library/UserLibrary';
import AddBookToLibrary from './screens/Library/AddBookToLibrary';
import ScanIsbn from './screens/Library/ScanIsbn';
import SelectFromInput from './screens/Library/SelectFromInput';
import ConfirmIsbnScan from './screens/Library/ConfirmIsbnScan';
import BookAddedSuccessfully from './screens/Library/BookAddedSuccessfully';
import UserWishList from './screens/WishList/UserWishList';
import AddBookToWishList from './screens/WishList/AddBookToWishList';
import SelectFromInputWL from './screens/WishList/SelectFromInputWL';
import InsertedSuccessfully from './screens/WishList/InsertedSuccessfully';
import BestMatches from './screens/SearchBestMatches/BestMatches';
import SendRequest from './screens/SearchBestMatches/SendRequest';
import AddDetailsToRequest from './screens/SearchBestMatches/AddDetailsToRequest';
import RequestSent from './screens/SearchBestMatches/RequestSent';
import AllRequests from './screens/Requests/AllRequests';
import RequestDetails from './screens/Requests/RequestDetails';
import AllMessages from './screens/Chat/AllMessages';
import SingleUserChat from './screens/Chat/SingleUserChat';
import RequestAccepted from './screens/Requests/RequestAccepted';
import { useFonts, Rosario_600SemiBold } from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';
import apiService from './ApiService';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    fontFamily: 'Rosario_500Medium',
    fontSize: 20,
  },
  headerBackTitle: 'Back',
};

function Library() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Your Library"
        component={UserLibrary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Insert A New Book"
        component={AddBookToLibrary}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
          },
          headerTitle: '',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="ScanISBN"
        component={ScanIsbn}
        options={headerOptions}
      />
      <Stack.Screen
        name="Confirm the Book"
        component={ConfirmIsbnScan}
        options={
          (headerOptions,
          {
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'white',
              shadowColor: 'transparent',
            },
          })
        }
      />
      <Stack.Screen
        name="Select a Book From The List"
        component={SelectFromInput}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
          },
          headerTitle: '',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="Book Added Successfully"
        component={BookAddedSuccessfully}
        options={
          (headerOptions,
          {
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'white',
              shadowColor: 'transparent',
            },
          })
        }
      />
    </Stack.Navigator>
  );
}

function WishList() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Your Wish List"
        component={UserWishList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add a New Book"
        component={AddBookToWishList}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
          },
          headerTitle: '',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="Select one Book"
        component={SelectFromInputWL}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
          },
          headerTitle: '',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="Inserted Successfully"
        component={InsertedSuccessfully}
        options={
          (headerOptions,
          {
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'white',
              shadowColor: 'transparent',
            },
          })
        }
      />
    </Stack.Navigator>
  );
}

function SearchBestMatches() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Best Matches"
        component={BestMatches}
        options={headerOptions}
      />
      <Stack.Screen
        name="Send Request"
        component={SendRequest}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
          },
          headerTitle: '',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="Add Details To The Request"
        component={AddDetailsToRequest}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
          },
          headerTitle: '',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="Request Sent"
        component={RequestSent}
        options={
          (headerOptions,
          {
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'white',
              shadowColor: 'transparent',
            },
          })
        }
      />
    </Stack.Navigator>
  );
}

function Requests() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="All Requests"
        component={AllRequests}
        options={headerOptions}
      />
      <Stack.Screen
        name="Details of the Request"
        component={RequestDetails}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
          },
          headerTitle: '',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="RequestAccepted"
        component={RequestAccepted}
        options={
          (headerOptions,
          {
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'white',
              shadowColor: 'transparent',
            },
          })
        }
      />
    </Stack.Navigator>
  );
}

function Chats() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={AllMessages}
        options={headerOptions}
      />
      <Stack.Screen
        name="Chat"
        component={SingleUserChat}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
          },
          headerTitle: '',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppScreens() {
  const { user } = useContext(UserContext);
  const [numOfReq, setNumOfReq] = useState(null);
  const [numOfMessages, setNumOfMessages] = useState(null);
  const [fontsLoaded] = useFonts({
    Rosario_600SemiBold,
  });

  useEffect(() => {
    async function controlForRequests() {
      if (user.id !== '') {
        const response = await apiService.getNumberOfRequests(user.id);
        let filteredUserTo = response.filter(
          (request) => request.userTo === user.id,
        );
        let mappedUserTo = filteredUserTo.map(
          (element) => element.hasBeenViewed,
        );
        let numberOfRequestNotSeenUserTo = mappedUserTo.filter(
          (el) => el === false,
        );
        let filteredUserFrom = response.filter(
          (request) => request.userFrom === user.id,
        );
        let mappedUserFrom = filteredUserFrom.map(
          (element) => element.hasBeenViewed,
        );
        let numberOfRequestNotSeenUserFrom = mappedUserFrom.filter(
          (el) => el === true,
        );
        let numberOfRequestNotSeen = [
          ...numberOfRequestNotSeenUserFrom,
          ...numberOfRequestNotSeenUserTo,
        ];
        setNumOfReq(
          numberOfRequestNotSeen.length ? numberOfRequestNotSeen.length : null,
        );
      }
    }
    async function controlForMessages() {
      if (user.id !== '') {
        const response = await apiService.getNumberOfMessages(user.id);
        let messagesWithNotification = response.filter(
          (msg) => msg.notification === true,
        );
        setNumOfMessages(
          messagesWithNotification.length
            ? messagesWithNotification.length
            : null,
        );
      }
    }
    function triggerInterval() {
      setInterval(controlForRequests, 2000);
      setInterval(controlForMessages, 2000);
    }
    triggerInterval();
  }, [user.id]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        {!user.auth ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Library') {
                  iconName = focused ? 'library-sharp' : 'library-sharp';
                } else if (route.name === 'Wish List') {
                  iconName = focused ? 'star-sharp' : 'star-sharp';
                } else if (route.name === 'Matches') {
                  iconName = focused ? 'people-sharp' : 'people-sharp';
                } else if (route.name === 'Requests') {
                  iconName = focused ? 'mail-open-sharp' : 'mail-open-sharp';
                } else if (route.name === 'Chats') {
                  iconName = focused
                    ? 'chatbubbles-sharp'
                    : 'chatbubbles-sharp';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#5D3FD3',
              tabBarInactiveTintColor: 'black',
              headerShown: false,
              tabBarStyle: {
                backgroundColor: 'white',
                height: 75,
                paddingBottom: 25,
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: 'Rosario_600SemiBold',
              },
            })}
          >
            <Tab.Screen name="Library" component={Library} />
            <Tab.Screen name="Wish List" component={WishList} />
            <Tab.Screen name="Matches" component={SearchBestMatches} />
            <Tab.Screen
              name="Requests"
              component={Requests}
              options={{ tabBarBadge: numOfReq }}
            />
            <Tab.Screen
              name="Chats"
              component={Chats}
              options={{ tabBarBadge: numOfMessages }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    );
  }
}
