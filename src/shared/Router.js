import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import CampSearch from "../pages/CampSearch";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import CampDetail from "../pages/CampDetail";
import ReviewAdd from "../pages/ReviewAdd";
import ReserveSearch from "../pages/ReserveSearch";
import ReserveDetail from "../pages/ReserveDetail";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camp/search" element={<CampSearch />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/campdetail" element={<CampDetail />} />
            <Route path="/reviewadd" element={<ReviewAdd />} />
            <Route path="/reserve/search" element={<ReserveSearch />} />
            <Route path="/reserve/detail/:id" element={<ReserveDetail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default Router;
