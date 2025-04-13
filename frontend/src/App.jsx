import "./App.css";
import { lazy, Suspense } from "react";
const Signup = lazy(() => import("./components/auth/Signup"));
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/auth/Login"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/shared/Loader";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Suspense
            fallback={
              <div
                style={{
                  background: "white",
                  display: "flex",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
            </Routes>
            <Footer />
          </Suspense>
          
        </Router>
      </div>
    </>
  );
}

export default App;
