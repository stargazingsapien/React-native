import React from 'react';
import { render, screen , userEvent, waitFor} from '@testing-library/react-native';
import App from '../App';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import { server } from '../src/setupTests';
import { handlers } from '../src/handlers';



it('renders correctly', () => {
  renderer.create(<App />);
});

it('renders "nisarg" in the Text component', () => {
const { getByText } = render(<App />);
expect(getByText(/nisarg/)).toBeTruthy();
});

it('finds the button and clicks it',async () => {
  const user = userEvent.setup();
  render(<App/>);
  const Text = screen.getByText('Hello! This is nisarg here.');
  expect(Text).toBeTruthy();

  const button = screen.getByText('Update Text'); ;
  await user.press(button);
  const updatedText = screen.getByText('The text has been updated!');
  expect(updatedText).toBeTruthy();

});

// global.fetch = jest.fn(() =>
// Promise.resolve({
//   json: () => Promise.resolve({
//     users: [
//       { id: 1, firstName: 'Emily' },
//       { id: 2, firstName: 'Michael' },
//     ],
//   }),
// })
// ) as jest.Mock;


// it('fetches and displays user data when "Fetch User Data" button is pressed', async () => {
// const user = userEvent.setup();
// const { getByText, findByText } = render(<App />);
// await user.press(getByText('Fetch User Data'));
// await waitFor(() => {
//   expect(findByText('Emily')).toBeTruthy();
//   expect(findByText('Michael')).toBeTruthy();
// });

// expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/users');
// });

// global.fetch = jest.fn(() =>
//   Promise.reject(new Error('Fetch failed'))
// ) as jest.Mock;

// it('shows an error message when fetch fails', async () => {
//   const user = userEvent.setup();
//   render(<App />);
//   await user.press(screen.getByText('Fetch User Data'));
//   const errorText = await screen.findByText('Something went wrong!!');
//   expect(errorText).toBeTruthy();
// });

it('fetches and displays user data when "Fetch User Data" button is pressed through MSW', async () => {
  const user = userEvent.setup();
  const { getByText, findByText } = render(<App />);
  const button = getByText('Fetch User Data')
  await user.press(getByText('Fetch User Data'));
  expect(button).not.toBeUndefined();
  await user.press(button);
  const text = await findByText("Update Text");
  expect(text).not.toBeUndefined()
  screen.debug()

});

it('shows an error message when fetch fails through MSW', async () => {
  const user = userEvent.setup();
  server.use(...handlers.error);
  render(<App />);
  const fetchButton = screen.getByText('Fetch User Data');
  await user.press(screen.getByText('Fetch User Data'));
  expect(fetchButton).not.toBeUndefined();
  await userEvent.press(fetchButton);
  const errorText = await screen.findByText('Something went wrong!');
  expect(errorText).toBeTruthy();
  screen.debug()
});


