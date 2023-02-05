import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "react-alice-carousel/lib/alice-carousel.css";
import ChoosenCurrency from "./ChoosenCurrency";

ReactDOM.render(
  <React.StrictMode>
    <ChoosenCurrency>
      <App />
    </ChoosenCurrency>,
</React.StrictMode>,
  document.getElementById('root')
);

//document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");