import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./components/Login/Auth";
import Root from "./components/layout/Root";
import { Switch } from "react-router-dom/";
import Inbox from "./components/SideBar/Inbox";
import SentMail from "./components/SideBar/SentMail";
//import Message from "./components/SideBar/Message";
import "./App.css";
import ReceiveMessageDetail from "./components/SideBar/ReceiveMessageDetail";
import SentMessageDetail from "./components/SideBar/SentMessageDetail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Root>
          <Route path="/inbox" component={Inbox} />
          <Route path="/sentmail" component={SentMail}/>
          <Route path="/receive/:id" exact component={ReceiveMessageDetail}/>
          <Route path="/sent/:id" exact component={SentMessageDetail}/>
        </Root>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
