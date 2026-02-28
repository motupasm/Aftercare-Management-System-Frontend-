import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/registration/Registration.jsx";
import Gallery from "./pages/gallery/Gallery.jsx";
import Admin from "./pages/admin_dashboard/Admin.jsx";
import ParentsDashboard from "./pages/parents_dashboard/Parents_dashboard.jsx";
import SignUp from "./pages/sign_up/SignUp.jsx";
import SignIn from "./pages/sign_in/SignIn.jsx";
import PendingReview from "./pages/pending_review/PendingReview.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<App />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/parents-dashboard" element={<ParentsDashboard />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/pending-review" element={<PendingReview />} />
    </Routes>
  </BrowserRouter>,
);
