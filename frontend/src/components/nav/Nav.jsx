import React, { useState, useEffect } from "react";
import "./nav.css";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";

const Nav = ({handleSearch, searchTxt, setSearchTxt}) => {
  return (
    <div className="container">
      <nav className="navHeight navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <Link to='/' style={{textDecoration: 'none'}}><h3 className="logoText">Create it!</h3></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbarCollapse collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          
        </li>
      </ul>
      <AccountMenu searchTxt={searchTxt} setSearchTxt={setSearchTxt} handleSearch={handleSearch} />
    </div>
  </div>
</nav>
    </div>
  );
};

export default Nav;
