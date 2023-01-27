import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import CampSearch from "../pages/camp/CampSearch";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/signUp/Login";
import CampDetail from "../pages/camp/CampDetail";
import ReviewAdd from "../pages/review/ReviewAdd";
import ReserveSearch from "../pages/reserve/ReserveSearch";
import ReserveDetail from "../pages/reserve/ReserveDetail";
import ReviewList from "../pages/review/ReviewList";
import ReviewDetail from "../pages/review/ReviewDetail";
import LikeReview from "../pages/review/LikeReview";
import RecentViewCamp from "../pages/camp/RecentViewCamp";
import MyPage from "../pages/myPage/MyPage";
import MyCamp from "../pages/myPage/MyCamp";
import MyReview from "../components/MyPage/MyReview";
import ReservePost from "../pages/reserve/ReservePost";
import ReviewEdit from "../pages/review/ReviewEdit";
import NotFount from "./NotFound";
import ScrollTop from "./ScrollTop";
import ReserveEdit from "../pages/reserve/ReserveEdit";
import MyReserve from "../pages/myPage/MyReserve";

function Router() {
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/camp/search"
              element={<CampSearch />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/campdetail/:id" element={<CampDetail />} />
            <Route path="/reviewadd" element={<ReviewAdd />} />
            <Route path="/reserve/search" element={<ReserveSearch />} />
            <Route path="/reserve/post" element={<ReservePost />} />
            <Route path="/reserve/edit/:id" element={<ReserveEdit />} />
            <Route path="/reserve/detail/:id" element={<ReserveDetail />} />
            <Route path="/reviewlist/:id" element={<ReviewList />} />
            <Route path="/reviewdetail/:id" element={<ReviewDetail />} />
            <Route path="/reviewedit/:id" element={<ReviewEdit />} />
            <Route path="/likereview" element={<LikeReview />} />
            <Route path="/recentviewcamp" element={<RecentViewCamp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/mycamp" element={<MyCamp />} />
            <Route path="/mypage/myreview" element={<MyReview />} />
            <Route path="/mypage/myreserve" element={<MyReserve />} />
            <Route path="*" element={<NotFount />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default Router;
