import React from 'react';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id:1,
    name: "",
    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: "Brilliant episode!",
    runtime: 1
}

const testEpisodeWithoutImage = {
    //Add in approprate test data structure here.
    id:2,
    name: "",
    image: null,
    season: 2,
    number: 2,
    summary: "",
    runtime: 2
}

test("renders without error", () => {
    render(<Episode episode={testEpisode}/>)
});

test("renders the summary test passed as prop", ()=>{
    // ACT:
    render(<Episode episode={testEpisode}/>);
    // ARRANGE: Find the summary text
    const summary = screen.queryByText(/brilliant episode!/i);
    // ASSERT: Expect summary to exist
    expect(summary).toBeInTheDocument();
});

test("renders default image when image is not defined", ()=>{
    // ACT: Render Episode component with test data w/o image
    render(<Episode episode={testEpisodeWithoutImage}/>);
    // ARRANGE: Find the episode image
    const image = screen.queryByRole('img');
    // ASSET: Expect image src and alt to be default image url
    expect(image.src).toContain('/stranger_things.png');
    expect(image.alt).toContain('/stranger_things.png');
})

//Tasks
//1. Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
//2. Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. Use no more then 3 different expect statements to test the the existance of the summary value.
//3. The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to null. Test that the alt tag of the image displayed is set to './stranger_things.png'.