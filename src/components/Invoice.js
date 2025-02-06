import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdSimCardDownload } from "react-icons/md";
import "jspdf-autotable";
import "./Invoice.css";

const Invoice = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("userToken");

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://backendfinance-ofpv.onrender.com/auth/getorder",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched Orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  // Handle invoice download
  // Handle invoice download
  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    // Add title to the PDF
    doc.setFontSize(16);
    doc.text("Invoice", 20, 20);
    doc.setFontSize(12);

    // Add Invoice Details
    doc.text(`Invoice ID: ${order.invoiceId || "N/A"}`, 20, 30);
    doc.text(`Order ID: ${order._id || "N/A"}`, 20, 40);
    doc.text(`Username: ${order.userId?.name || "N/A"}`, 20, 50);
    doc.text(`Vendor: ${order.vendorId?.name || "N/A"}`, 20, 60);
    doc.text(
      `Date: ${new Date(order.createdAt).toLocaleDateString() || "N/A"}`,
      20,
      70
    );

    // Define the table data
    const tableColumnHeaders = [
      "No. of Users",
      "Years of Support",
      "Existing Vendor",
      "Buying Period",
    ];
    const tableData = [
      [
        order.numberOfUsers || "N/A",
        order.yearsOfSupport || "N/A",
        order.existingVendor || "N/A",
        order.buyingPeriod || "N/A",
      ],
    ];

    // Add the table to the PDF
    doc.autoTable({
      startY: 80, // Starting position for the table
      head: [tableColumnHeaders], // Table headers
      body: tableData, // Table data
      theme: "striped", // Optional: can be "grid", "striped", or "plain"
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [0, 102, 204], // Custom blue for the header
        textColor: 255, // White text color
      },
    });

    // Save the generated PDF
    doc.save(`invoice_${order.invoiceId || "N/A"}.pdf`);
  };

  return (
    <div className="invoice-dashboard-bg">
      <div className="container">
        <h2 className="text-center p-5" style={{ color: "white" }}>
          INVOICE
        </h2>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Invoice ID</th>
              <th>Order ID</th>
              <th>Vendor</th>
              <th>No. of Users</th>
              <th>Years of Support</th>
              <th>Existing Vendor</th>
              <th>Buying Period</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.invoiceId}</td>
                <td>{order._id}</td>
                <td>{order.vendorId.name}</td>
                <td>{order.numberOfUsers}</td>
                <td>{order.yearsOfSupport}</td>
                <td>{order.existingVendor}</td>
                <td>{order.buyingPeriod}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm download-button"
                    onClick={() => downloadInvoice(order)}
                  >
                    <MdSimCardDownload className="download-icon" />
                    Download Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
