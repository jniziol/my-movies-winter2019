import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Movies from './Movies';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Movies />
  </BrowserRouter>,
  document.getElementById('root')
);
