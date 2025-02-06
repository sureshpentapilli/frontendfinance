import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewOrder.css";

const NewOrder = () => {
  const [vendors, setVendors] = useState([]);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("https://backendcheck-hlpb.onrender.com/auth/vendors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response", response.data);
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, [token]);

  return (
    <div className="order-dashboard-bg">
      <div className="container p-5">
        <h3 className="text-center mb-4 display-7 animate-fade-in" style={{ color: "white" }}>
          Available Vendors
        </h3>
        <div className="row">
          {vendors.map((vendor) => (
            <div className="col-md-3 mb-4 animate-card" key={vendor._id} data-aos="fade-up">
              <div className="card h-100 shadow-sm vendor-card">
                <div className="card-body d-flex flex-column align-items-center text-center">
                  <img
                    src={`https://backendcheck-hlpb.onrender.com${vendor.vendorlogo}`}
                    alt="Vendor Logo"
                    className="vendor-logo"
                    onClick={() => navigate(`/dashboard/questions/${vendor._id}`)}
                  />
                 
                  <button className="btn btn-primary mt-2" onClick={() => navigate(`/dashboard/questions/${vendor._id}`)}>
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
