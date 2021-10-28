import React from 'react';
import AppScreens from './AppScreens';
import { UserProvider } from './AuthContext';

export default function App() {
  return (
    <UserProvider>
      <AppScreens />
    </UserProvider>
  );
}
