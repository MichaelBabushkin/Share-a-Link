  
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg' // relative path to image 

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            
      <img
        src={logo}
        width="75"
        height="70"
        style={ { borderRadius:10, marginRight:"1%" }}
        className="d-inline-block align-top"
        alt="logo image"
      />
    
        <div  className="navbar-brand" style={ { fontFamily:'Yellowtail',fontSize:'155%' }}>Share-a-Link</div>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Links</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Save New Link</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}