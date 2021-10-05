import React from "react";
// import { render } from "@testing-library/react-native";
import renderer from 'react-test-renderer'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import LoadingSearching from "../components/LoadingSearching";


jest.mock('lottie-react-native');

test("renders", () => {
        const tree = renderer.create(<LoadingSearching />).toJSON();
        expect(tree.children.length).toBe(1);
})