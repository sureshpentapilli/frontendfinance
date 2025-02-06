import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Questions.css";

const Questions = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [responses, setResponses] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(
          `https://backendcheck-hlpb.onrender.com/auth/vendor/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVendor(response.data);
        const initialResponses = response.data.questions.map((q) => ({
          questionId: q._id,
          answer: "",
        }));
        setResponses(initialResponses);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        toast.error("Failed to load vendor details.", { position: "bottom-right" });
      }
    };

    if (token) {
      fetchVendorDetails();
    }
  }, [vendorId, token]);

  const handleInputChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index].answer = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (responses.some((r) => r.answer.trim() === "")) {
      toast.error("All questions must be answered before submitting.", {
        position: "bottom-right",
      });
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      await axios.post(
        "https://backendcheck-hlpb.onrender.com/auth/submit-responses",
        {
          vendorId,
          userId,
          responses,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Responses submitted successfully!", { position: "bottom-right" });
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast.error("Failed to submit responses. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  return (
    
    <div className="container mt-5 height">
      <div className="card col-md-6 shadow p-4">
        <h1 className="text-center text-primary">Questions Page</h1>
        {vendor ? (
          <div>
            <h6 className="text-secondary">VENDOR NAME: {vendor.name}</h6>
            <p className="text-muted">VENDOR DETAILS: {vendor.details}</p>
            <p> VENDOR WEBSITE :
              <a href={vendor.website} target="_blank" rel="noopener noreferrer">
               {vendor.website}
              </a>
            </p>
           

            <h3 className="mt-4">Questions:</h3>

            <form onSubmit={handleSubmit}>
              {vendor?.questions?.length > 0 ? (
                vendor.questions.map((q, index) => (
                  <div className="mb-3" key={q._id}>
                    <label className="form-label fw-bold">{q.question}</label>
                    <textarea
                      className="form-control"
                      value={responses[index]?.answer || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder="Your answer"
                      rows="3"
                    />
                  </div>
                ))
              ) : (
                <p className="text-danger">No questions available</p>
              )}

              <button type="submit" className="btn btn-success w-100 mt-3">
                Submit Answers
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center text-muted">Loading vendor details...</p>
        )}
      </div>
      
    </div>
  );
};

export default Questions;
