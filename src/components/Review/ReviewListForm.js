import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import { ItemBox } from "../elements/ItemBox";
import LikeListElement from "./LikeListElement";

const ReviewListForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState();

  const fetchreviewList = async () => {
    try {
      const { data } = await instance.get(`review/reviewall/${id}`);
      setReviewList(data.data.responseReviewListDtos);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(reviewList);

  useEffect(() => {
    fetchreviewList();
  }, []);

  if(!reviewList){
    return(
      <div>Loading ...</div>
    )
  }

  return (
    <>
      <Main>
        {/* <BackBtn>
          <AiOutlineLeft />
        </BackBtn> */}
        <CampName>{reviewList[0]?.campingName}</CampName>
      </Main>
      <Write
        onClick={() => {
          navigate(`/reviewadd`);
        }}
      >
        <BsPencilFill />
      </Write>
      <ItemBox>
        {/* {reviewList?.map((a) => {
          return (
            <>
              <Pic>{a.reviewUrl}</Pic>
              <Comm>
                <ComDiv>
                  <Pro></Pro>
                  <div>{a.nickname}</div>
                  <Date>{a.modifiedAt}</Date>
                </ComDiv>
                <Ment>{a.content}</Ment>
              </Comm>
            </>
          );
        })} */}
        {reviewList?.map((v) => {
          return (
            <PostBox key={v.reviewId} >
              <LikeListElement review={v}/>
            </PostBox>
          );
        })}
      </ItemBox>
    </>
  );
};

export default ReviewListForm;

const Main = styled.div`
  display: flex;
  align-items: center;
  /* width: 360px; */
  /* margin-left: 5px; */
`;
const CampName = styled.div`
  /* margin-left: 95px; */
  margin: var(--interval) auto var(--interval)  auto;
`;

const BackBtn = styled.button`
  background-color: white;
  border: 1px solid white;
`;

const Write = styled.button`
  width: 360px;
  display: flex;
  justify-content: flex-end;
  background-color: white;
  border: 1px solid white;
`;

const PostBox = styled.div`
  /* width: 335px; */
  /* height: 277px; */
  margin-bottom: 32px;
`;

const Pic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 335px;
  height: 158px;
  background-color: grey;
`;

const Pro = styled.div`
  width: 35px;
  height: 35px;
  background-color: gray;
  border-radius: 100%;
`;

const Comm = styled.div`
  width: 335px;
  height: 150px;
  border: 1px solid #b5b5b5;
  margin-bottom: 15px;
`;

const ComDiv = styled.div`
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px 0px 21px;
`;

const Ment = styled.div`
  width: 291px;
  margin: 25px 0px 15px 21px;
`;

const Date = styled.div`
  margin-left: 95px;
`;
