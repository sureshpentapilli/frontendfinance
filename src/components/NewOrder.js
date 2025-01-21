import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewOrder.css";

const NewOrder = () => {
  const [vendors, setVendors] = useState([]);
  const [orderForm, setOrderForm] = useState({
    vendorId: "", 
    numberOfUsers: "",
    yearsOfSupport: "",
    existingVendor: "",
    buyingPeriod: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("userToken");

  // Fetch Vendors
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/vendors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, [token]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Open Modal and Set Vendor ID
  const openModal = (vendorId) => {
    setOrderForm((prevForm) => ({
      ...prevForm,
      vendorId,
    }));
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setOrderForm({
      vendorId: "",
      numberOfUsers: "",
      yearsOfSupport: "",
      existingVendor: "",
      buyingPeriod: "",
    });
  };

  // Post Order
  const handleOrderNow = async () => {
    try {
      if (!orderForm.vendorId) {
        alert("Please select a vendor");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/auth/createorder",
        orderForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order placed successfully!");
      closeModal();
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
    }
  };

  return (
    <div className="order-dashboard-bg">
    <div className="container p-5">
      <h3 className="text-center mb-4 display-7 animate-fade-in" style={{color:"white"}}>
        Available Vendors
      </h3>
      <div className="row">
        {vendors.map((vendor) => (
          <div
            className="col-md-3 mb-4 animate-card"
            key={vendor._id}
            data-aos="fade-up"
          >
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title vendor-name">
                  Vendor Name: {vendor.name}
                </h5>
                <p className="card-text vendor-details">
                  Vendor Details: {vendor.details}
                </p>
                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() => openModal(vendor._id)}
                >
                  Select Vendor
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Place Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="numberOfUsers" className="form-label">
                      Number of Users
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="numberOfUsers"
                      name="numberOfUsers"
                      value={orderForm.numberOfUsers}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="yearsOfSupport" className="form-label">
                      Years of Support
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="yearsOfSupport"
                      name="yearsOfSupport"
                      value={orderForm.yearsOfSupport}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="existingVendor" className="form-label">
                      Existing Vendor
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="existingVendor"
                      name="existingVendor"
                      value={orderForm.existingVendor}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="buyingPeriod" className="form-label">
                      Buying Period
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="buyingPeriod"
                      name="buyingPeriod"
                      value={orderForm.buyingPeriod}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOrderNow}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default NewOrder;
