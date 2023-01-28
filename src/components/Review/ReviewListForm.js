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
`;
const CampName = styled.div`
  margin: var(--interval) auto var(--interval)  auto;
`;

const Write = styled.button`
  width: 360px;
  display: flex;
  justify-content: flex-end;
  background-color: white;
  border: 1px solid white;
`;

const PostBox = styled.div`
  margin-bottom: 32px;
`;