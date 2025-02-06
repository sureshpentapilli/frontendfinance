import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../pages/context/UserContext";
import axios from "axios";

const AnswerStatus = () => {
  const { vendorId, userId, setVendorId, setUserId } = useUser();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(null);
  const [userResponses, setUserResponses] = useState([]);
  const [error, setError] = useState("");

  // Set vendorId and userId from URL if not already set
  useEffect(() => {
    console.log("Params from URL:", params.vendorId, params.userId); // Debugging line
    if (!vendorId && params.vendorId) {
      setVendorId(params.vendorId);
    }
    if (!userId && params.userId) {
      setUserId(params.userId);
    }
  }, [params.vendorId, params.userId, vendorId, userId, setVendorId, setUserId]);

  // Fetch user responses once vendorId and userId are available
  useEffect(() => {
    if (vendorId && userId) {
      fetchUserResponses();
    }
  }, [vendorId, userId]);

  const fetchUserResponses = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        `http://localhost:5000/auth/vendor/${vendorId}/user/${userId}/responses`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVendor(response.data.vendor);
      setUserResponses(response.data.userResponses);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching user responses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Vendor & User Responses</h2>

      {/* Display loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Display error message with retry button */}
      {error && (
        <p style={{ color: "red" }}>
          {error}{" "}
          <button onClick={fetchUserResponses} disabled={loading}>
            Retry
          </button>
        </p>
      )}

      {/* Display Vendor Info */}
      {vendor && (
        <div>
          <h3>{vendor.name}</h3>
          <p>{vendor.details}</p>
          <a href={vendor.website} target="_blank" rel="noopener noreferrer">
            {vendor.website}
          </a>
        </div>
      )}

      {/* Display User Responses */}
      {userResponses.length > 0 ? (
        <ul>
          {userResponses.map((res, i) => (
            <li key={i}>
              <strong>{res.question}</strong>: {res.answer}
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No responses found for this user.</p>
      )}
    </div>
  );
};

export default AnswerStatus;
