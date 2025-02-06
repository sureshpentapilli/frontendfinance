import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import NewOrder from "./components/NewOrder";
import UserCredit from "./components/UserCredit";
import OrderPlaced from "./components/OrderPlaced";
import Invoice from "./components/Invoice";
import Questions from "./components/Questions";
import AnswerStatus from "./components/AnswerStatus";
import { UserProvider } from "./pages/context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* User Dashboard with Nested Routes */}
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route path="neworder" element={<NewOrder />} />
            <Route path="credituser" element={<UserCredit />} />
            <Route path="orders" element={<OrderPlaced />} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="questions/:vendorId" element={<Questions />} />
            <Route path="/dashboard/vendor/:vendorId/user/:userId/responses" element={<AnswerStatus />} />


          </Route>

          {/* Fallback Route for Unknown Paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Add ToastContainer here to show toasts globally */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </UserProvider>
    </Router>
  );
}

export default App;
