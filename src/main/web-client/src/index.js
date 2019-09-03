import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js/dist/popper.min.js'
import App from './Components/App'
import Navbar from "./Components/Navbar";
import ReactJumbotron from './Components/ReactJumbotron'

ReactDOM.render(<ReactJumbotron />, document.getElementById('react-jumbotron'));
ReactDOM.render(<Navbar />, document.getElementById('react-navbar'));
ReactDOM.render(<App />, document.getElementById('main-container'));
