import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/App';
//import ReactLoading  from 'react-loading';

/*
const express = require("express");

const favicon = require('express-favicon');
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port);
app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/ 

ReactDOM.render(
  <React.StrictMode>
    <App />
 
  </React.StrictMode>,
  document.getElementById('root')
);