import React from "react";
// import { render } from "@testing-library/react-native";
import renderer from 'react-test-renderer'
import DisplaySingleRequest from "../components/displaySingleRequest";
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@expo-google-fonts/rosario',() => {
    return {useFonts: (...args,mockAsyncStorage) => args}
})

test("renders", () => {
        const tree = renderer.create(<DisplaySingleRequest />).toJSON();
        expect(tree.children.length).toBe(1);
})