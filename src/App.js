import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./components/Login/Auth";
import Root from "./components/layout/Root";
import { Switch } from "react-router-dom/";
import Inbox from "./components/SideBar/Inbox";
import SentMail from "./components/SideBar/SentMail";
import Message from "./components/SideBar/Message";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Root>
          <Route path="/Inbox">
            <Inbox />
          </Route>
          <Route path="/SentMail">
            <SentMail />
          </Route>
          <Route path="/Message/:folder/:emailId" exact>
            <Message />
          </Route>
        </Root>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
