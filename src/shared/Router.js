import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import CampSearch from "../pages/CampSearch";


function Router() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camp/search" element={<CampSearch />}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default Router;
