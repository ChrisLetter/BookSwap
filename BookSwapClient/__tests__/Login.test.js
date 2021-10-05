import React from "react";
// import { render } from "@testing-library/react-native";
import Login from "../screens/Authentication/Login";
import renderer from 'react-test-renderer'
import Mock from '../__mocks__/@react-native-async-storage/index.js'
import { exportAllDeclaration } from "@babel/types";
jest.mock('@react-native-async-storage/async-storage', () => {
    jest.mock('@react-native-community/async-storage', () => {
        return {
          getItem: async (...args) => args,
          setItem: async (...args) => args,
          removeItem: async (...args) => args,
        };
      });
});

jest.mock('@expo-google-fonts/rosario',() => {
    return {useFonts: (...args) => args}
})

jest.mock('lottieViewAddress', () => '');

it("renders", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree.children.length).toBe(1);
})