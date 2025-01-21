import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import NewOrder from "./components/NewOrder";
import UserCredit from "./components/UserCredit";
import OrderPlaced from "./components/OrderPlaced";
import Invoice from "./components/Invoice";

function App() {
  return (
    <Router>
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
        </Route>

        {/* Fallback Route for Unknown Paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
