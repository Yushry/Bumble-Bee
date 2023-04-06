import React from "react";
import { NavLink } from "react-router-dom";


const UserMenu = () => {
  return (
    <>

      <div className="text-center">

        <div className="list-group">

          <NavLink to="/userDashboard" className="list-group-item list-group-item-action sidebarr">
            USER DETAILS
          </NavLink>

          <NavLink to="/userOrderList" className="list-group-item list-group-item-action sidebarr">
            ORDER DETAILS
          </NavLink>

        </div>

      </div>

    </>
  );
};

export default UserMenu;
