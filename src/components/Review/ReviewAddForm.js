import React, { useRef, useState, useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { ImStarFull } from "react-icons/im";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __postreviewadd } from "../../redux/modules/reviewAddSlice";
import NameSearch from "../Search/NameSearch";

import { useModal } from "../../hooks/useModal";
import PostStar from "./PostStar";
import { ItemBox } from "../elements/ItemBox";

import { FiSearch } from "react-icons/fi";

import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { getCookies } from "../../api/cookieControler";

const ReviewAddForm = () => {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);

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
  const [content, setContent] = useState("");
  const [imgState, setImgState] = useState(false);
  // const [previewImg, setPreviewImg] = useState([]);
  const [images, setImages] = useState([]);
  // const [form, setForm] = useState();
  // const array1 = [0, 1, 2, 3, 4];
  // const array2 = [0, 1, 2, 3, 4];
  // const array3 = [0, 1, 2, 3, 4];
  // const array4 = [0, 1, 2, 3, 4];
  // const array5 = [0, 1, 2, 3, 4];
  // const [clicked1, setClicked1] = useState([false, false, false, false, false]);
  // const [clicked2, setClicked2] = useState([false, false, false, false, false]);
  // const [clicked3, setClicked3] = useState([false, false, false, false, false]);
  // const [clicked4, setClicked4] = useState([false, false, false, false, false]);
  // const [clicked5, setClicked5] = useState([false, false, false, false, false]);
  const [isComp, setIsComp] = useState(false);

  useEffect(() => {
    setIsComp(Boolean(campingName) && Boolean(images) && content.trim() !== "");
  }, [campingId, content, images]);

  const onFileUpload = () => {
    imgRef.current.click();
  };

  const onUploadImg = (e) => {
    if (images.length + e.target.files.length > 5) {
      alert("최대 5장까지 등록가능합니다.");
      return;
    }
    setImages([...images, ...e.target.files]);
    // const file = e.target.files;
    // const img = new FormData();
    // console.log(file);
    // const newFile = [...previewImg];
    // for (let i = 0; i < file.length; i++) {
    //   const newImgUrl = URL.createObjectURL(file[i]);
    //   console.log(newImgUrl);
    //   newFile.push(newImgUrl);
    //   img.append("reviewUrlList", newImgUrl);
    //   console.log(img);
    // }
    // console.log(newFile)
    // setPreviewImg(newFile);
    // setForm(img);
    // setImgState(true);
  };

  const onChangeExp = (e) => {
    setContent(e.target.value);
  };

  const onDeleteImg = (index) => {
    // const newImg = [...previewImg];
    const curImg = [...images];
    // newImg.splice(index, 1)
    curImg.splice(index, 1);
    // setPreviewImg(newImg)
    setImages(curImg);
  };

  // const starClick1 = (index) => {
  //   const clickStates = [...clicked1];
  //   for (let i = 0; i < 5; i++) {
  //     clickStates[i] = i <= index ? true : false;
  //   }
  //   setClicked1(clickStates);
  // };

  // const starClick2 = (index) => {
  //   const clickStates = [...clicked2];
  //   for (let i = 0; i < 5; i++) {
  //     clickStates[i] = i <= index ? true : false;
  //   }
  //   setClicked2(clickStates);
  // };

  // const starClick3 = (index) => {
  //   const clickStates = [...clicked3];
  //   for (let i = 0; i < 5; i++) {
  //     clickStates[i] = i <= index ? true : false;
  //   }
  //   setClicked3(clickStates);
  // };

  // const starClick4 = (index) => {
  //   const clickStates = [...clicked4];
  //   for (let i = 0; i < 5; i++) {
  //     clickStates[i] = i <= index ? true : false;
  //   }
  //   setClicked4(clickStates);
  // };

  // const starClick5 = (index) => {
  //   const clickStates = [...clicked5];
  //   for (let i = 0; i < 5; i++) {
  //     clickStates[i] = i <= index ? true : false;
  //   }
  //   setClicked5(clickStates);
  // };

  // const score1 = clicked1.filter(Boolean).length;
  // const score2 = clicked2.filter(Boolean).length;
  // const score3 = clicked3.filter(Boolean).length;
  // const score4 = clicked4.filter(Boolean).length;
  // const score5 = clicked5.filter(Boolean).length;
  // console.log(score1, score2, score3, score4, score5);
  // console.log(clicked1, clicked2, clicked3, clicked4, clicked5);

  // console.log(score1, score2, score3, score4, score5)

  const onReviewadd = (e) => {
    const token = getCookies("id");
    if (!token) {
      alert("로그인 정보가 없습니다. 로그인후 다시 시도 해주세요.");
      return;
    }
    const data = new FormData();
    images.map((v) => {
      data.append("multipartFile", v);
    });
    const contents = {
      content,
      score1,
      score2,
      score3,
      score4,
      score5,
    };
    data.append(
      "requestReviewWriteDto",
      new Blob([JSON.stringify(contents)], { type: "application/json" })
    );
    console.log(data);
    for (let value of data.values()) {
      console.log(value);
    }
    dispatch(
      __postreviewadd({
        id: campingId,
        data: data,
        // data :{
        //   reviewUrlList: data,
        //   content,
        //   score1,
        //   score2,
        //   score3,
        //   score4,
        //   score5,
        // }
      })
    );
    navigate("/");
  };

  // const score1 = clicked1.filter(Boolean).length;
  // const score2 = clicked2.filter(Boolean).length;
  // const score3 = clicked3.filter(Boolean).length;
  // const score4 = clicked4.filter(Boolean).length;
  // const score5 = clicked5.filter(Boolean).length;
  // console.log(score1, score2, score3, score4, score5);
  // console.log(clicked1, clicked2, clicked3, clicked4, clicked5);

  // const onReviewadd = () => {
  //   dispatch(
  //     __postreviewadd({
  //       id : campingId,
  //       data: data
  //       // data :{
  //       //   reviewUrlList: data,
  //       //   content,
  //       //   score1,
  //       //   score2,
  //       //   score3,
  //       //   score4,
  //       //   score5,
  //       // }
  //     })
  //   );
  // };

  // const deleteImg = () => {
  //   URL.revokeObjectURL(previewImg)
  //   setPreviewImg("");
  // }
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
    for (let i = 0; i < 5; i++) {
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
      <TopTitle>리뷰 작성하기</TopTitle>
      <ItemBox>
        <Detail>
          방문하신 캠핑장을 알려주세요.<MinText>(필수)</MinText>
        </Detail>
        <InputBox>
          <CampInput onClick={campName.onOpen}>
            {campingId && campingName ? `${campingName}` : "캠핑장명"}
          </CampInput>
          <SeartchBtn>
            <FiSearch />
          </SeartchBtn>
        </InputBox>
      </ItemBox>
      <GrayLine />
      <ItemBox>
        <Detail>
          세부항목의 별점을 매겨주세요.<MinText>(필수)</MinText>
        </Detail>
        <GrayHr />
        <ScoreTop>
          <NameDiv>정보일치</NameDiv>
          <DetailInfo>홈페이지에 나온 정보랑 일치한가요?</DetailInfo>
        </ScoreTop>
        <StarBox>
          <PostStar setScore={setScore1} />
        </StarBox>
        <GrayHr />
        <ScoreTop>
          <NameDiv>편의시설</NameDiv>
          <DetailInfo>주변에 편의점, 마트 등 편의시설이 있었나요?</DetailInfo>
        </ScoreTop>
        <StarBox>
          <PostStar setScore={setScore2} />
        </StarBox>
        <GrayHr />
        <ScoreTop>
          <NameDiv>관리상태</NameDiv>
          <DetailInfo>위험한 부분없이 관리가 잘되어 있었나요?</DetailInfo>
        </ScoreTop>
        <StarBox>
          <PostStar setScore={setScore3} />
        </StarBox>
        <GrayHr />
        <ScoreTop>
          <NameDiv>접근성</NameDiv>
          <DetailInfo>접근하기 좋은 위치에 있었나요?</DetailInfo>
        </ScoreTop>
        <StarBox>
          <PostStar setScore={setScore4} />
        </StarBox>
        <GrayHr />
        <ScoreTop>
          <NameDiv>청결도</NameDiv>
          <DetailInfo>
            청소와 정리가 잘되어 있었나요?(화장실, 분리수거 등)
          </DetailInfo>
        </ScoreTop>
        <StarBox>
          <PostStar setScore={setScore5} />
        </StarBox>
      </ItemBox>
      <GrayLine />
      <ItemBox>
        <Detail>
          캠핑장의 사진을 올려주세요.<MinText>(필수)</MinText>
        </Detail>
        <PicBtnBox>
          <PictureBox>
            <ImgPreview />
          </PictureBox>
        </PicBtnBox>
      </ItemBox>
      <GrayLine />
      <ItemBox>
        <Detail>
          캠핑장 경험에 대해 알려주세요.<MinText>(필수)</MinText>
        </Detail>
        <ExpInput
          placeholder="다른 캠퍼들이 참고 할 수 있도록 캠핑장에 대해 알려주세요."
          onChange={onChangeExp}
        ></ExpInput>
        <AddBtn disabled={!isComp} onClick={() => onReviewadd()}>
          등록하기
        </AddBtn>
        {campName.isOpen && (
          <NameSearch
            setCampingName={setCampingName}
            setCampingId={setCampingId}
            onClose={campName.onClose}
          />
        )}
      </ItemBox>
    </MainDiv>
  );
};

export default ReviewAddForm;

const TopTitle = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: var(--interval);
`;

const GrayHr = styled.div`
  height: 1px;
  background-color: var(--Gray1);
  margin-top: 12px;
  margin-bottom: var(--interval);
`;

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--BackColor2);
`;

const InputBox = styled.div`
  display: flex;
  position: relative;
`;
const CampInput = styled.div`
  width: 100%;
  height: 56px;
  line-height: 56px;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 36px;
  padding-left: var(--interval);
  padding-right: var(--interval);
`;

const SeartchBtn = styled.div`
  height: 19px;
  font-size: 19px;
  position: absolute;
  right: 24px;
  line-height: 19px;
  transform: translateY(100%);
`;

const Detail = styled.div`
  height: 19px;
  padding-bottom: 16px;
`;
const MinText = styled.a`
  font-size: 12px;
`;

const ScoreTop = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0 6px 16px 6px;
`;

const NameDiv = styled.div`
  width: 60px;
  font-size: 14px;
  font-weight: bold;
`;
const DetailInfo = styled.div`
  font-size: 12px;
`;

const StarBox = styled.div`
  font-size: 32px;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const PictureBox = styled.div`
  display: flex;
  gap: 6px;
  justify-content: space-between;
`;

const PicBtnBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const PicAdd = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: var(--Gray4);
  color: white;
  border: 1px solid #a8a8a8;
  font-size: 32px;
`;

const PicAdd2 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: white;
  border: 1px solid #a8a8a8;
  font-size: 32px;
  position: relative;

  img {
    width: 60px;
    height: 60px;
  }
`;

const ImgBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  font-size: 35px;
`;

const ExpInput = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 158px;
  border: 1px solid var(--Gray3);
  border-radius: 10px;
  margin-bottom: 25px;
  padding: 16px;
  resize: none;
`;

const AddBtn = styled(Button)`
  width: 100%;
`;

const BtnCircle = styled.div`
  position: absolute;
  height: 14px;
  width: 14px;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0px;
  right: 0px;
  z-index: 2;
`;

const XBtn = styled(BsXLg)`
  position: absolute;
  height: 7px;
  width: 7px;
  translate: 50% 50%;
  z-index: 3;
  color: white;
`;
const GrayLine = styled.div`
  background-color: var(--Gray1);
  height: 8px;
  width: 100%;
`;
