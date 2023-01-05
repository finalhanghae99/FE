import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import CampDetail from "../pages/CampDetail";
import ReviewAdd from "../pages/ReviewAdd";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/campdetail" element={<CampDetail />} />
            <Route path="/reviewadd" element={<ReviewAdd />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default Router;
