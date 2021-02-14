import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers } from "redux"
import { reducer as tooltip } from "redux-tooltip"
import {Provider} from 'react-redux' 

ReactDOM.render(<App />, document.getElementById("root"));
