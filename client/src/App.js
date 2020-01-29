import React from "react";
import "./App.css";
import * as bhistory from "history";
import Provider from "react-redux/es/components/Provider";
import { Router } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Layout from "./core/components/Layout";
import store from "./store";

const history = bhistory.createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Layout></Layout>
          </MuiPickersUtilsProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
