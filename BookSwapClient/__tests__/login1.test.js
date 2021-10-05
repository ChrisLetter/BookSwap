import React from 'react';
import renderer from 'react-test-renderer';
import LoadingLogin from '../components/LoadingLogin';
import Login from '../screens/Authentication/Login';


  test('has 1 child', () => {
    const tree = renderer.create(<LoadingLogin />).toJSON();
    expect(tree).toMatchSnapshot();
  });


// import Login from "./Login";
// import { render,screen } from "@testing-library/react-native";
// import userEvent from '@testing-library/user-event'
// import { Item } from "react-native-paper/lib/typescript/components/List/List";

// jest.mock('../../ApiServiceJWT.js', () => ({
//     login: () => ({id: '12345_6789', accessToken: 'abcd_efgh'})
// }))

// it('should call login from ApiServiceJWT with the correct credentials', async () => {
//     const setUser = jest.fn()
//     const credentials = {id: '12345_6789', accessToken: 'abcd_efgh'}

//     render(<Login setUser={setUser}/>)

//     const emailInput = screen.getByPlaceholderText("Email");
//     const passInput = screen.getByPlaceholderText("Password");
//     const submitBtn = screen.getByRole('button',{name: "login"});

//     //populate the input fields
//     userEvent.type(emailInput, 'abriele@gmail.com');
//     userEvent.type(passInput, '1234567');
//     await userEvent.click(submitBtn);

//     expect(setUser).toHaveBeenCalledWith(credentials);
// })
