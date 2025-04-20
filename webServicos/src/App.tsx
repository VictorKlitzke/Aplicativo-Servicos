import { Route, Routes } from "react-router-dom";
import LoginPage from "./views/pages/auth/login_page";
import PrivateRoute from "./routers/privateRouter";
import HomePage from "./views/home_page";
import NotFoundPage from "./error/Founderror";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route path="/error" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
