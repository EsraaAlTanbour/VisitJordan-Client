import { BrowserRouter, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

function AppContent() {
  const location = useLocation();

  const isDashboardPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/provider");

  return (
    <>
      {!isDashboardPage && <Navbar />}
      <AppRoutes />
      {!isDashboardPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;