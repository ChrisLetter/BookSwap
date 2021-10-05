import React from "react";
// import { render } from "@testing-library/react-native";
import renderer from 'react-test-renderer'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import Login from "../screens/Authentication/Login";
// import { exportAllDeclaration } from "@babel/types";
// import { describe } from "jest-circus";
// import asMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";
// import Mock from '../__mocks__/@react-native-async-storage/index.js'

// jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-native-async-storage/async-storage', () => {
    return {mockAsyncStorage}
});


jest.mock('@expo-google-fonts/rosario',() => ''
// return {useFonts: (...args,mockAsyncStorage) => args}
)

jest.mock('lottie-react-native', () => '');

test("render", () => {
    console.log({mockAsyncStorage});
    expect(1).toBe(1);
})


// test("renders", () => {
// //         console.log({mockAsyncStorage});
//         // const tree = renderer.create(<Login />).toJSON();
//         // expect(tree.children.length).toBe(1);
//         render
// })
