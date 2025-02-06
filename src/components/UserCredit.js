import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Toast } from "react-bootstrap";
import "./UserCredit.css";

const UserCreditTable = () => {
  const [credits, setCredits] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const token = localStorage.getItem("userToken"); // Fetch user token from localStorage

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get(
          "https://backendcheck-hlpb.onrender.com/auth/mycredit",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
          }
        );

        // Log the full response to investigate more details
        console.log("Full API Response:", response.data);

        if (response.data.credits && response.data.credits.length === 0) {
          console.log("No credits found for this user.");
        }

        setCredits(response.data.credits || []); // Default to an empty array
      } catch (error) {
        console.error("Error fetching credit data:", error);
        setCredits([]); // Set empty array on error to avoid undefined issues
        setToastMessage("Failed to load credit details. Please try again.");
        setShowToast(true);
      } finally {
        setLoading(false); // Always stop loading spinner
      }
    };

    fetchCredits();
  }, [token]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spinner animation="border" />
        <p>Loading credit details...</p>
      </div>
    );
  }

  return (
    <div className="credit-dashboard-bg">
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "white" }}>My Credit Details</h2>
        {credits.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Approved Days</th>
              </tr>
            </thead>
            <tbody>
              {credits.map((credit) => (
                <tr key={credit._id}>
                  <td>{credit.user?.name || "N/A"}</td>
                  <td>{credit.user?.email || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        credit.status === "approved"
                          ? "bg-success"
                          : credit.status === "rejected"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {credit.status.charAt(0).toUpperCase() +
                        credit.status.slice(1)}
                    </span>
                  </td>
                  <td>{credit.approvedDays || 0}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No credit details found.</p>
        )}

        {/* Toast for feedback */}
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastMessage.includes("failed") ? "danger" : "success"}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default UserCreditTable;
