import React from "react";
import { NavLink } from "react-router-dom";



const AdminMenu = () => {

  return (
    <>

      <div className="text-center">

        <div className="list-group">

          <NavLink to="/adminDashboard" className="list-group-item list-group-item-action sidebarr">
            ALL USER DETAILS LIST
          </NavLink>


          <NavLink to="/createnewProduct" className="list-group-item list-group-item-action sidebarr" >
            CREATE NEW PRODUCT
          </NavLink>


          <NavLink to="/productPage" className="list-group-item list-group-item-action sidebarr"  >
            ALL PRODUCT DETAILS
          </NavLink>


          <NavLink to="/customerOrderList" className="list-group-item list-group-item-action sidebarr" >
            CUSTOMER ORDER LIST
          </NavLink>

        </div>

      </div>

    </>

  );
};

export default AdminMenu;
