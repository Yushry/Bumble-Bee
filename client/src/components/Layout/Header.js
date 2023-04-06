import React, { useState } from "react";
import { Link,  } from "react-router-dom";

const Header = () => {

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('token');
    window.location.href = '/homepage';
    alert('Logout Successfull')
  };

  const token = localStorage.getItem("token");

  return (
    <>
      <nav className="navbar  ">
        <div className="nav">
          <div>
            <h1 className="link link1">Bumble Bee</h1>
          </div>

          <div className="nav2">
            {token ? (
              <button className="linkbtn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link to={"/userLoginPage"} className="link">
                  User Login
                </Link>
                <Link to={"/adminLoginPage"} className="link">
                  Admin Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
