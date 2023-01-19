import React, { useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { ImStarFull } from "react-icons/im";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  __postreviewadd,
  __putreviewadd,
} from "../../redux/modules/reviewAddSlice";
import NameSearch from "../Search/NameSearch";

import { useModal } from "../../hooks/useModal";
import PostStar from "./PostStar";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewEditForm = () => {
  const [score1, setScore1] = useState();
  const [score2, setScore2] = useState();
  const [score3, setScore3] = useState();
  const [score4, setScore4] = useState();
  const [score5, setScore5] = useState();

  const location = useLocation();
  const reviewDetail = location.state.reviewDetail;

  const campName = useModal();
  if (campName.isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  const imgRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [campingId, setCampingId] = useState("");
  const [campingName, setCampingName] = useState("");
  const [contents, setContents] = useState(reviewDetail?.content);
  const [images, setImages] = useState([]);

  const onFileUpload = () => {
    imgRef.current.click();
  };

  const onUploadImg = (e) => {
    if (images.length + e.target.files.length > 5) {
      alert("최대 5장까지 등록가능합니다.");
      return;
    }
    setImages([...images, ...e.target.files]);
  };

  const onChangeExp = (e) => {
    setContents(e.target.value);
    console.log(contents);
  };

  const onDeleteImg = (index) => {
    const curImg = [...images];
    curImg.splice(index, 1);
    setImages(curImg);
  };

  const onReviewEdit = (id) => {
    console.log("e", id);
    const data = new FormData();
    images.map((v) => {
      data.append("multipartFile", v);
    });
    const contentss = {
      content: contents,
      score1,
      score2,
      score3,
      score4,
      score5,
    };
    data.append(
      "requestReviewWriteDto",
      new Blob([JSON.stringify(contentss)], { type: "application/json" })
    );
    console.log(data);
    for (let value of data.values()) {
      console.log(value);
    }
    dispatch(
      __putreviewadd({
        id: id,
        data: data,
      })
    );
    navigate("/");
  };

  const ImgPlus = () => {
    return (
      <label id="fileUpload" htmlFor="fileUpload" onChange={onUploadImg}>
        <input
          multiple="multiple"
          id="fileUpload"
          type="file"
          accept="image/*"
          ref={imgRef}
          style={{ display: "none" }}
        />
        <ImgBtn onClick={onFileUpload}>+</ImgBtn>
      </label>
    );
  };

  const ImgPreview = () => {
    const imgArr = [];
    for (let i = 1; i < 5; i++) {
      if (images[i]) {
        imgArr.push(
          <PicAdd2 key={i}>
            <img
              width="100%"
              height="100%"
              src={URL.createObjectURL(images[i])}
            />
            <BtnCircle>
              <XBtn onClick={() => onDeleteImg(i)} />
            </BtnCircle>
          </PicAdd2>
        );
      } else {
        imgArr.push(
          <PicAdd key={i}>
            <ImgPlus />
          </PicAdd>
        );
      }
    }
    return imgArr;
  };

  return (
    <MainDiv>
      <CampName>방문하신 캠핑장을 알려주세요.(필수)</CampName>
      <CampInput onClick={campName.onOpen}>
        {campingId && campingName
          ? `${campingName}`
          : `${reviewDetail?.campingName}`}
      </CampInput>
      <Detail>세부항목의 별점을 매겨주세요.(필수)</Detail>
      <div>
        <StarBox>
          <NameDiv>정보일치</NameDiv>
          <PostStar setScore={setScore1} />
        </StarBox>
        <StarBox2>
          <NameDiv>편의시설</NameDiv>
          <PostStar setScore={setScore2} />
        </StarBox2>
        <StarBox2>
          <NameDiv>관리상태</NameDiv>
          <PostStar setScore={setScore3} />
        </StarBox2>
        <StarBox2>
          <NameDiv>접근성</NameDiv>
          <PostStar setScore={setScore4} />
        </StarBox2>
        <StarBox2>
          <NameDiv>청결도</NameDiv>
          <PostStar setScore={setScore5} />
        </StarBox2>
      </div>
      <Pic>캠핑장의 사진을 올려주세요.(필수)</Pic>
      <PicDiv>
        {images[0] ? (
          <>
            <MainImg src={URL.createObjectURL(images[0])} />
            <BtnCircle>
              <XBtn
                onClick={() => {
                  onDeleteImg(0);
                }}
              />
            </BtnCircle>
          </>
        ) : (
          <ImgPlus />
        )}
      </PicDiv>
      <PicBtnBox>
        <PictureBox>
          <ImgPreview />
        </PictureBox>
      </PicBtnBox>
      <Exp>캠핑장 경험에 대해 알려주세요.(필수)</Exp>
      <ExpInput
        type="text"
        placeholder="다른 캠퍼들이 참고 할 수 있도록 캠핑장에 대해 알려주세요."
        onChange={onChangeExp}
        value={contents}
      ></ExpInput>
      <AddBtn onClick={() => onReviewEdit(reviewDetail.reviewId)}>
        수정하기
      </AddBtn>
      {campName.isOpen && (
        <NameSearch
          setCampingName={setCampingName}
          setCampingId={setCampingId}
          onClose={campName.onClose}
        />
      )}
    </MainDiv>
  );
};

export default ReviewEditForm;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CampName = styled.div`
  width: 390px;
  padding-left: 27px;
  margin: 39px 0px 7px 27px;
`;

const CampInput = styled.div`
  width: 335px;
  height: 38px;
  border: 1px solid #898989;
  border-radius: 5px;
  margin: 0px 0px 0px 2px;
`;

const Detail = styled.div`
  width: 390px;
  height: 19px;
  padding-left: 27px;
  margin: 27px 0px 0px 27px;
`;

const NameDiv = styled.div`
  width: 60px;
`;

const StarBox = styled.div`
  display: flex;
  width: 265px;
  font-size: 14px;
  color: #757575;
  padding-left: 27px;
  margin: 17px 96px 0px 0px;
`;

const StarBox2 = styled.div`
  display: flex;
  width: 265px;
  font-size: 14px;
  color: #757575;
  padding-left: 27px;
  margin: 8px 96px 0px 0px;
`;

const PictureBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 324px;
  margin-right: 5px;
`;

const Pic = styled.div`
  width: 265px;
  padding-left: 27px;
  margin: 17px 96px 0px 0px;
`;

const PicDiv = styled.div`
  width: 324px;
  height: 324px;
  margin-top: 23px;
  background-color: white;
  border: 1px solid #a8a8a8;
  font-size: 42px;
  position: relative;

  input {
    display: none;
  }
  img {
    z-index: 1;
  }
  label {
    z-index: 0;
    width: 324px;
    height: 324px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const PicBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 324px;
  margin-top: 23px;
`;

const PicAdd = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 72px;
  height: 72px;
  background-color: white;
  border: 1px solid #a8a8a8;
  font-size: 32px;
  margin-left: 5px;
`;

const PicAdd2 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 72px;
  height: 72px;
  background-color: white;
  border: 1px solid #a8a8a8;
  font-size: 32px;
  margin-left: 5px;
  position: relative;

  img {
    width: 72px;
    height: 77px;
  }
`;

const ImgBtn = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  background-color: white;
  font-size: 35px;
`;

const Exp = styled.div`
  width: 390px;
  margin-top: 27px;
  margin-bottom: 17px;
  padding-left: 54px;
`;

const ExpInput = styled.input`
  width: 100%;
  height: 143px;
  word-break: normal;
  border: 1px solid #b7b7b7;
  margin: 0px 24px 25px 24px;
`;

const AddBtn = styled.button`
  width: 324px;
  height: 53px;
  border: 1px solid #d9d9d9;
  background-color: #d9d9d9;
  border-radius: 10px;
`;

const MainImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  background-color: blue;
  object-position: center;
  position: relative;
`;
const BtnCircle = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: white;
  top: 5px;
  right: 5px;
  z-index: 2;
`;

const XBtn = styled(BsXLg)`
  position: absolute;
  height: 20px;
  width: 20px;
  z-index: 3;
`;
