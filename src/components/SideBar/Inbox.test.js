import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Inbox from "./Inbox.js";
import store from "../../store/index.js";

describe("Inbox component", () => {
  test("renders checkbox and blue dot for unread messages", () => {
    const fakeInboxItems = [
      { id: '1', sub: 'Subject 1', description: 'Description 1', date: new Date().toISOString(), unRead: true },
      { id: '2', sub: 'Subject 2', description: 'Description 2', date: new Date().toISOString(), unRead: false },
    ];

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Inbox />
        </BrowserRouter>
      </Provider>
    );

    // Check if the checkbox is rendered for both read and unread messages
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(fakeInboxItems.length);

    // Check if the blue dot is rendered for the unread message
    const blueDot = screen.getByTestId('blue-dot-1');
    expect(blueDot).toBeInTheDocument();

    // Check if the blue dot is not rendered for the read message
    const noBlueDot = screen.queryByTestId('blue-dot-2');
    expect(noBlueDot).toBeNull();
  });
});
