//Snapshot testing
import React from 'react'
import LoadingLogin from '../components/LoadingLogin'
import renderer from 'react-test-renderer'

test('Loading Login snapshot', () => {
    //create snapshot
    const snap = renderer.create(
        <LoadingLogin />
    ).toJSON();

    //Expected output
    expect(snap).toMatchSnapshot();
})