import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import store from './store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    </Provider>
)
  ;
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).toBeNull();
});
