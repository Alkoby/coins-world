import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CoinsData from "./CoinsData";

ReactDOM.render(
  <React.StrictMode>
    <CoinsData>
      <App />
    </CoinsData>
  </React.StrictMode>,
  document.getElementById('root')
);

//document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");