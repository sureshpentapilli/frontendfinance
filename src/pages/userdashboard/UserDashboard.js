import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

import {
  FaClipboardList,
  FaShoppingCart,
  FaFileInvoice,
  FaPlus,
  FaClipboardCheck,
} from "react-icons/fa";
import { Collapse } from "react-bootstrap";

const UserDashboard = () => {
  const { vendorId, setVendorId, userId, setUserId } = useUser();
  const params = useParams();
  
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [bgColor, setBgColor] = useState("bg-light");

  useEffect(() => {
    console.log("UserDashboard Params:", params.vendorId, params.userId);
    if (params.vendorId && params.userId) {
      console.log("Setting Vendor ID:", params.vendorId);
      console.log("Setting User ID:", params.userId);
      setVendorId(params.vendorId);
      setUserId(params.userId);
    }
  }, [params.vendorId, params.userId]);

  const handleSidebarToggle = () => {
    setOpen(!open);
    setBgColor(open ? "bg-light" : "bg-primary");
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="d-flex">
      <div
        className={`sidebar ${bgColor}`}
        style={{ width: "250px", height: "100vh", paddingTop: "20px" }}
      >
        <div className="sidebar-header text-center">
          <h4>User Dashboard</h4>
          <button className="btn btn-dark mt-2" onClick={handleSidebarToggle}>
            {open ? "Close Sidebar" : "Open Sidebar"}
          </button>
        </div>
        <Collapse in={open}>
          <ul className="sidebar-links list-unstyled mt-4">
            <li>
              <Link to="credituser" className="text-dark d-block py-2 px-3">
                <FaClipboardList /> My Credit
              </Link>
            </li>
            <li>
              <Link to="orders" className="text-dark d-block py-2 px-3">
                <FaShoppingCart /> Orders Placed
              </Link>
            </li>
            <li>
              <Link to="invoice" className="text-dark d-block py-2 px-3">
                <FaFileInvoice /> Invoice Download
              </Link>
            </li>
            <li>
              <Link to="neworder" className="text-dark d-block py-2 px-3">
                <FaPlus /> Vendors
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/vendor/${vendorId}/user/${userId}/responses`}
                className="text-dark d-block py-2 px-3"
              >
                <FaClipboardCheck /> History
              </Link>
            </li>
          </ul>
        </Collapse>
      </div>
      <main className="flex-grow-1">
        <button
          onClick={handleLogout}
          className="btn btn-danger position-fixed top-1 end-0 m-4"
        >
          Logout
        </button>
        <Outlet />
      </main>
    </div>
  );
};
export default UserDashboard;
