import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import fetchShow from '../../api/fetchShow'
jest.mock('../../api/fetchShow')


test('renders Display renders without any passed in props', ()=>{
    // ACT/ARRANGE/ASSERT:
    render(<Display/>)
});

test('when button is clicked, gets show data', async ()=>{
    fetchShow.mockResolvedValueOnce({
            name: 'Turkey',
            summary: 'Lunch Meats',
            seasons: [{id:'1', name: 'Turkey goes hunting', episodes: []}, {id:'2', name: 'Turkey goes ice skating', episodes: []}]      
    });
//     // ARRANGE:
    render(<Display/>)
//     // ACT:
    const button = screen.getByRole('button');
    userEvent.click(button);
    // ASSERT:
    const showContainer = await screen.findAllByTestId('show-container');
    expect(showContainer).toHaveLength(1)
});

const testData = {
    name: 'Turkey',
    summary: 'Lunch Meats',
    seasons: [{id:'1', name: 'Turkey goes hunting', episodes: []}, {id:'2', name: 'Turkey goes ice skating', episodes: []}]      
}

test('when button is clicked, amount of select options is equal to amount of seasons in test data', async ()=>{
    fetchShow.mockResolvedValueOnce({
        name: 'Turkey',
        summary: 'Lunch Meats',
        seasons: [{id:'1', name: 'Turkey goes hunting', episodes: []}, {id:'2', name: 'Turkey goes ice skating', episodes: []}]      
    });
    // ARRANGE:
    render(<Display/>)
    // ACT:
    const button = screen.getByRole('button');
    userEvent.click(button);
    // ASSERT:
    const selectOptions = await screen.findAllByTestId('season-option');
    expect(selectOptions).toHaveLength(testData.seasons.length);
});


test('when button is clicked, DisplayFunc function is called', async ()=>{
    const fakeDisplayFunc = jest.fn();
    fetchShow.mockResolvedValueOnce({
        name: 'Turkey',
        summary: 'Lunch Meats',
        seasons: [{id:'1', name: 'Turkey goes hunting', episodes: []}, {id:'2', name: 'Turkey goes ice skating', episodes: []}]      
    });
    // ARRANGE:
    render(<Display displayFunc={fakeDisplayFunc}/>)
    // ACT:
    const button = screen.getByRole('button');
    userEvent.click(button);
    // ASSERT
    // const showContainer = await screen.findAllByTestId('show-container');
    await waitFor(() => expect(fakeDisplayFunc).toBeCalledTimes(1));
});






///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.