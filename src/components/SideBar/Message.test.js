
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Message from "./Message";
import store from "../../store/index.js";

describe("Message Component", () => {
  test("renders loading text when no message is selected", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      </Provider>
    );

    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });

  

});

