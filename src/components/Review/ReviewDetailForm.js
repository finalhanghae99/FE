import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../elements/Button";
import { ItemBox } from "../elements/ItemBox";
import { getCookies } from "../../api/cookieControler";
import Alert from "../elements/Alert";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ReviewDetailForm = () => {
  const [reviewDetail, setReviewDetail] = useState();
  const param = useParams();
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState();
  const [likeCount, setLikeCount] = useState(0);

  const settings = {
    dots: true, // 슬라이더 밑에 버튼
    Infinity: true, // 컨텐츠가 끝까지 갔을 때 무한으로 반복
    speed: 500, // 컨텐츠 넘어가는 속도 500ms
    slidersToShow: 1, // 보이는 컨텐츠 개수 1개
    slidesToScroll: 1, // 한번에 넘어가는 컨텐츠 수 1개
    centerPadding: "0px",
    arrows: false,
  };

  useEffect(() => {
    setIsLike(reviewDetail?.likeState);
    setLikeCount(reviewDetail?.likeCount);
  }, [reviewDetail]);

  const fetchreviewDetail = async () => {
    try {
      const { data } = await instance.get(
        `/reviewlookup/reviewone/${param.id}`
      );
      if (data.statusCode === 200) {
        return setReviewDetail(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteReview = async () => {
    try {
      const data = await instance.delete(`/review/${param.id}`);
      if (reviewDetail?.ownerCheck === false) {
        Alert({ body: "삭제 권한이 없습니다." });
      } else if (reviewDetail?.ownerCheck === true) {
        Alert({ body: "삭제 완료!" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditReview = (id, reviewDetail) => {
    if (reviewDetail.ownerCheck === false) {
      Alert({ body: "수정 권한이 없습니다." });
    } else {
      navigate(`/reviewedit/${id}`, { state: { reviewDetail } });
    }
  };

  const starRender = (score) => {
    let stars = [];
    for (let i = 0; i < score; i++) {
      stars.push(
        <StarText key={i} style={{ color: "var(--Brand6)" }}>
          ★
        </StarText>
      );
    }
    for (let i = score; i < 5; i++) {
      stars.push(
        <StarText key={i} style={{ color: "var(--Gray1)" }}>
          ★
        </StarText>
      );
    }
    return stars;
  };

  const clickLike = async (id) => {
    const token = getCookies("id");
    if (!token) {
      Alert({ body: "로그인이 필요 합니다." });
      return;
    }
    try {
      const { data } = await instance.post(`/review/${id}/like`);
      (isLike) ? (setLikeCount(likeCount - 1)) : (setLikeCount(likeCount + 1))
      setIsLike(!isLike)
    } catch (error) { console.log(error); }
  }

  useEffect(() => {
    fetchreviewDetail();
  }, []);

  return (
    <MainDiv>
      <ViewWindow>
        <StyledSlider {...settings}>
          {reviewDetail?.reviewUrlList.map((a, i) => {
            return <Pic key={i} src={a}></Pic>;
          })}
        </StyledSlider>
        <LikeBox>
          <div
            onClick={() => {
              clickLike(reviewDetail?.reviewId);
            }}
          >
            {isLike ? <AiFillHeart /> : <AiOutlineHeart />}
          </div>
          <LikeCount>{likeCount}</LikeCount>
        </LikeBox>
      </ViewWindow>
      <ItemBox>
        <Title>
          <UserInfo>
            <Pro src={reviewDetail?.profileImageUrl}></Pro>
            <Nick>{reviewDetail?.nickname}</Nick>
          </UserInfo>
          <Date>{moment(reviewDetail?.modifiedAt).format("YYYY.MM.DD")}</Date>
        </Title>
        <Suv>
          <CampName onClick={()=> {navigate(`/campdetail/${reviewDetail?.campingId}`)}}>{reviewDetail?.campingName}</CampName>
        </Suv>
        <Stars>
          <StarBox2>
            <NameDiv>정보일치</NameDiv>
            <Star>({reviewDetail?.score1})</Star>
            <Starr>{starRender(reviewDetail?.score1)}</Starr>
          </StarBox2>
          <StarBox2>
            <NameDiv>편의시설</NameDiv>
            <Star>({reviewDetail?.score2})</Star>
            <Starr>{starRender(reviewDetail?.score2)}</Starr>
          </StarBox2>
          <StarBox2>
            <NameDiv>관리상태</NameDiv>
            <Star>({reviewDetail?.score3})</Star>
            <Starr>{starRender(reviewDetail?.score3)}</Starr>
          </StarBox2>
          <StarBox2>
            <NameDiv>접근성</NameDiv>
            <Star>({reviewDetail?.score4})</Star>
            <Starr>{starRender(reviewDetail?.score4)}</Starr>
          </StarBox2>
          <StarBox2>
            <NameDiv>청결도</NameDiv>
            <Star>({reviewDetail?.score5})</Star>
            <Starr>{starRender(reviewDetail?.score5)}</Starr>
          </StarBox2>
        </Stars>
      </ItemBox>
      <Content>
        <Contents>{reviewDetail?.content}</Contents>
      </Content>
      {reviewDetail?.ownerCheck ?
        <BtnBox>
        <EditBtn
          onClick={() => onEditReview(reviewDetail?.reviewId, reviewDetail)}
        >
          수정하기
        </EditBtn>
        <DelBtn onClick={onDeleteReview}>삭제하기</DelBtn>
      </BtnBox> : ""
      }
    </MainDiv>
  );
};
export default ReviewDetailForm;

const ViewWindow = styled.div`
  width: 100%;
  position: relative;
  &:after {
    height: 100px;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.5;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.5) 60%,
      black 100%
    );
  }
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-list {
  }
  .slick-dots {
    bottom: 25px;
  }
  .slick-dots li button:before {
    color: white;
  }
  .slick-dots li.slick-active button:before {
    color: black;
  }
`;

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: var(--font);
`;

const Pic = styled.img`
  width: 100%;
  height: 407px;
  object-position: center;
  object-fit: contain;
`;

const Title = styled.div`
  width: 100%;
  padding: 0px 0px 24px 0px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  line-height: 40px;
`;

const UserInfo = styled.div`
  display: flex;
  line-height: 40px;
`;

const CampName = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
`;

const Date = styled.div`
  font-size: 12px;
  color: var(--Gray3);
`;

const Suv = styled.div`
  width: 100%;
  padding-bottom: 18px;
  display: flex;
`;

const Nick = styled.div`
  font-size: 14px;
  margin-left: 8px;
`;

const Pro = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 100%;
`;

const Stars = styled.div`
  display: flex;
  flex-direction: column;
`;

const Star = styled.div`
  width: 17px;
  padding: 0 8px 0 0px;
`;

const StarBox2 = styled.div`
  display: flex;
  font-size: 14px;
  padding-bottom: 9px;
  line-height: 18px;
`;

const Starr = styled.span``;
const StarText = styled.span`
  color: ${(props) => props.color};
  font-size: 18px;
  line-height: 18px;
`;

const Content = styled.div`
  width: 100%;
  border-top: 8px solid #e1e1e1;
  padding-top: 24px;
  margin: 0px 24px 0px 24px;
  margin-top: 10px;
`;

const Contents = styled.div`
  margin: 0px 24px 0px 24px;
  word-break: break-all;
  white-space: pre-wrap;
`;

const NameDiv = styled.div`
  width: 60px;
`;

const EditBtn = styled(Button)`
  margin: 40px 0px 24px 0px;
`;

const DelBtn = styled.button`
  border: none;
  border-bottom: 1px solid var(--Brand6);
  background-color: white;
  font-size: 14px;
  padding-bottom: 4px;
  font-weight: 700;
  color: var(--Brand6);
`;

const LikeCount = styled.div`
  display: flex;
  font-size: 16px;
  line-height: 30px;
  padding-left: 6px;
  width: 15px;
  justify-content: right;
  font-weight: bold;
`;
const LikeBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  line-height: 30px;
  top: 20px;
  right: 20px;
  font-size: 30px;
  z-index: 5;
  color: white;
`;

const BtnBox = styled(ItemBox)`
  text-align: center;
  justify-content: center;
`