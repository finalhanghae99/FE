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
import ReviewList from "../pages/ReviewList";
import ReviewDetail from "../pages/ReviewDetail";
import LikeReview from "../pages/LikeReview";
import RecentViewCamp from "../pages/RecentViewCamp";
import MyPage from "../pages/MyPage";
import MyCamp from "../components/MyPage/MyCamp";
import MyReview from "../components/MyPage/MyReview";
import ReservePost from "../pages/ReservePost";

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
            <Route path="/reserve/post" element={<ReservePost />} />
            <Route path="/reserve/detail/:id" element={<ReserveDetail />} />
            <Route path="/reviewlist" element={<ReviewList />} />
            <Route path="/reviewdetail" element={<ReviewDetail />} />
            <Route path="/likereview" element={<LikeReview />} />
            <Route path="/recentviewcamp" element={<RecentViewCamp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/mycamp" element={<MyCamp />} />
            <Route path="/mypage/myreview" element={<MyReview />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default Router;
