import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./components/Login/Auth";
import Welcome from "./components/Pages/WelCome";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/" exact>
      <Auth/>
      </Route>
      <Route path="/Welcome">
       <Welcome/>
        </Route>
    </Switch>
    
    </BrowserRouter>
  );
}

export default App;
