import React from "react";
import Header from "./components/Header.js";
import Store from "./pages/Store.js";
import Cart from "./pages/Cart.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
import Admin from "./admin/admin.js";


export default function App() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
        <Route path="/admin">
            <Admin/>
          </Route>
       
          <Route path="/cart">
            <Cart />
          </Route>
          <Route exact path="/">
            <Store />
          </Route>
         
          

          
        </Switch>
      </>
    </Router>
  );
}
