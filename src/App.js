import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./components/Login/Auth";
import Root from "./components/layout/Root";
import { Switch } from "react-router-dom/";
import Inbox from "./components/SideBar/Inbox";
import SentMail from "./components/SideBar/SentMail";

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
        </Root>
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
