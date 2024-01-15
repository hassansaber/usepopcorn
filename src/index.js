import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import GeoLocate from './GeoLocate';
// import App from './App';
// import StarRating from './StarRating';
// import CurrencyConverter from './challange/CurrencyConverter';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StarRating
      maxRating={5}
      messages={["S", "A", "P", "W", "T"]} />
    <StarRating
      maxRating={10} />
    <StarRating /> */}
    {/* <CurrencyConverter /> */}
    <GeoLocate />
  </React.StrictMode>
);

