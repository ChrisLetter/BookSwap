//Snapshot testing
import React from 'react'
import renderer from 'react-test-renderer'
import Register from '../screens/Authentication/Register'

test('Loading Login snapshot', () => {
    //create snapshot
    const snap = renderer.create(
        <Register />
    ).toJSON();

    //Expected output
    expect(snap).toMatchSnapshot();
})