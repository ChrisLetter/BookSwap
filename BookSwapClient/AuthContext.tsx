import React, { useState, createContext } from 'react';

const initialState: any = {
  id: '',
  token: '',
  auth: false,
};

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (Accesstoken: string, id: string): void => {
    setUser({
      token: Accesstoken,
      id: id,
      auth: true,
    });
  };

  const logout = (): void => {
    setUser(initialState);
  };

  interface IUser {
    id: string;
    token: string;
    auth: boolean;
  }

  interface IContext {
    user: IUser;
    login: (Accesstoken: string, id: string) => void;
    logout: () => void;
  }

  const contextObj: IContext = { user, login, logout };

  return (
    <UserContext.Provider value={contextObj}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
