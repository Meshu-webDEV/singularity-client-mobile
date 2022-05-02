import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";

import { ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import App from "./App/App";

// Date stuff
import DateFnsUtils from "@date-io/dayjs";

// State
import ToastState from "./Context/Toast/ToastState";
import ModalState from "./Context/Modal/ModalState";
import AuthState from "./Context/Auth/AuthState";
import SidemenuState from "./Context/Sidemenu/SidemenuState";
import TeamsState from "./Context/Teams/TeamsState";
import EventState from "./Context/Event/EventState";

// Theme
import { defaultTheme } from "./lib/muiThemes";

ReactDOM.render(
  <BrowserRouter>
    <ToastState>
      <ModalState>
        <AuthState>
          <SidemenuState>
            <TeamsState>
              <EventState>
                <ThemeProvider theme={defaultTheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <App />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </EventState>
            </TeamsState>
          </SidemenuState>
        </AuthState>
      </ModalState>
    </ToastState>
  </BrowserRouter>,
  document.getElementById("root")
);
