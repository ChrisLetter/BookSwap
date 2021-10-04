/* eslint-disable prettier/prettier */
import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import Test from '../Test';

afterEach(cleanup);

describe('Test', () => {
    it('should show hello world', () => {
        const helloWorldText = 'Hello World!';

        const { toJSON, getByText } = render(<Test />);

        const foundHelloWorldText = getByText(helloWorldText);

        expect(foundHelloWorldText.props.children).toEqual(helloWorldText);
        expect(toJSON()).toMatchSnapshot();
    });
});