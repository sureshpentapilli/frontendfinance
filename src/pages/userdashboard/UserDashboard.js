import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaClipboardList, FaShoppingCart, FaFileInvoice, FaPlus } from "react-icons/fa"; // Importing icons
import { Collapse } from "react-bootstrap"; // For the toggle effect

const UserDashboard = () => {
  const [open, setOpen] = useState(true); // Sidebar is open by default
  const [bgColor, setBgColor] = useState("bg-light"); // Default background color for the user dashboard

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSidebarToggle = () => {
    setOpen(!open); // Toggle the sidebar open/close
    setBgColor(open ? "bg-light" : "bg-primary"); // Change background color on toggle
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("userToken");

    // Redirect to the login page
    navigate("/login"); // Change "/login" to your actual login route
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${bgColor}`} style={{ width: "250px",height:"100vh", paddingTop: "20px" }}>
        <div className="sidebar-header text-center">
          <h4>User Dashboard</h4>
          <button
            className="btn btn-dark mt-2"
            onClick={handleSidebarToggle}
            aria-controls="sidebar-links"
            aria-expanded={open}
          >
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
                <FaPlus /> New Order
              </Link>
            </li>
          </ul>
        </Collapse>
      </div>

      {/* Main Content */}
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
