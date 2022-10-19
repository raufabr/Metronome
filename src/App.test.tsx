import React from 'react';
import { queryByText, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event"
import MAXNUMBEROFBEATS from './constants/maxNumberOfManualBeats';

describe("It tests the metronome component which a bunch of test suites", () => {
  
  test('Renders the metronome app and checks for all the static components', () => {
    render(<App />);
    expect(screen.getByText("Metronome")).toBeInTheDocument();  
    const playButton = screen.getByRole("button", {name: /Play/i})
    expect(playButton).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument()  
    expect(screen.getByRole("button", { name: /Set/i })).toBeDisabled();
  });
  
  test("It toggles the play button when clicked", async() => {
    render(<App />);
    const playButton = screen.getByRole("button", {name: /Play/i});
    expect(playButton).toBeInTheDocument()
    userEvent.click(playButton)
    const pauseButton = await screen.findByRole("button", {name: /Pause/i});
    expect(pauseButton).toBeInTheDocument()
  });
  // TODO: Unable to figure out a nice way of testing changing the value of a slider
  // Add tests later to check that the Beat components are set to zero
    test.skip("It changes the value of the slider", async () => {
      render(<App />);
    });
  test("It adds a new Beat component every time space is pressed", async () => {
    render(<App />);
    const playButton = screen.getByRole("button", {name: /Play/i});
    expect(playButton).toBeInTheDocument();
    // This is the key code for a space
    userEvent.keyboard(" ");
    expect(screen.getByTestId("beat")).toBeInTheDocument()
  });
})