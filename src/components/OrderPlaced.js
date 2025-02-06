import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./OrderPlaced.css"

const OrderPlaced = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("userToken");

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://backendfinance-ofpv.onrender.com/auth/getorder", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className='orderplaced-dashboard-bg'>
    <div className="container">
      <h2 className="text-center p-5"style={{color:"white"}}>Your Orders</h2>
      <div className="row">
        {orders.map((order) => (
          <div className="col-md-3 mb-4" key={order._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
              <div className="order-details">
  <h5 className="card-title">
    Vendor: {order.vendorId?.details || "Unknown Vendor"}
  </h5>
  <p className="info">Number of Users: {order.numberOfUsers}</p>
  <p className="info">Years of Support: {order.yearsOfSupport}</p>
  <p className="info">Existing Vendor: {order.existingVendor}</p>
  <p className="info">Buying Period: {order.buyingPeriod}</p>
</div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default OrderPlaced;
