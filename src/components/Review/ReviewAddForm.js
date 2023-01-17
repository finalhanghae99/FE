import React, { useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { ImStarFull } from "react-icons/im";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __postreviewadd } from "../../redux/modules/reviewAddSlice";
import NameSearch from "../Search/NameSearch";

import { useModal } from "../../hooks/useModal";
import PostStar from "./PostStar";
import { useNavigate } from "react-router-dom";

const ReviewAddForm = () => {
  const [score1, setScore1] = useState();
  const [score2, setScore2] = useState();
  const [score3, setScore3] = useState();
  const [score4, setScore4] = useState();
  const [score5, setScore5] = useState();

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
      {/* <Div1>
        <BackBtn>
          <BsXLg />
        </BackBtn>
        <div>리뷰 작성하기</div>
      </Div1> */}
      <CampName>방문하신 캠핑장을 알려주세요.(필수)</CampName>
      <CampInput onClick={campName.onOpen}>
        {campingId && campingName ? `${campingName}` : "캠핑장명"}
      </CampInput>
      <Detail>세부항목의 별점을 매겨주세요.(필수)</Detail>
      <div>
        <StarBox>
          <NameDiv>정보일치</NameDiv>
          {/* {array1.map((el1) => (
            <Star key={el1}>
              <RatingBox>
                <ImStarFull
                  className={clicked1[el1] && "black"}
                  onClick={() => starClick1(el1)}
                />
              </RatingBox>
            </Star>
          ))} */}
          <PostStar setScore={setScore1} />
        </StarBox>
        <StarBox2>
          <NameDiv>편의시설</NameDiv>
          {/* {array2.map((el2) => (
            <Star key={el2}>
              <RatingBox>
                <ImStarFull
                  className={clicked2[el2] && "black"}
                  onClick={() => starClick2(el2)}
                />
              </RatingBox>
            </Star>
          ))} */}
          <PostStar setScore={setScore2} />
        </StarBox2>
        <StarBox2>
          <NameDiv>관리상태</NameDiv>
          {/* {array3.map((el3) => (
            <Star key={el3}>
              <RatingBox>
                <ImStarFull
                  className={clicked3[el3] && "black"}
                  onClick={() => starClick3(el3)}
                />
              </RatingBox>
            </Star>
          ))} */}
          <PostStar setScore={setScore3} />
        </StarBox2>
        <StarBox2>
          <NameDiv>접근성</NameDiv>
          {/* {array4.map((el4) => (
            <Star key={el4}>
              <RatingBox>
                <ImStarFull
                  className={clicked4[el4] && "black"}
                  onClick={() => starClick4(el4)}
                />
              </RatingBox>
            </Star>
          ))} */}
          <PostStar setScore={setScore4} />
        </StarBox2>
        <StarBox2>
          <NameDiv>청결도</NameDiv>
          {/* {array5.map((el5) => (
            <Star key={el5}>
              <RatingBox>
                <ImStarFull
                  className={clicked5[el5] && "black"}
                  onClick={() => starClick5(el5)}
                />
              </RatingBox>
            </Star>
          ))} */}
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
      ></ExpInput>
      <AddBtn onClick={() => onReviewadd()}>등록하기</AddBtn>
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

export default ReviewAddForm;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// const Div1 = styled.div`
//   display: flex;
//   width: 390px;
//   font-size: 20px;
//   margin-top: 31px;
// `;

// const BackBtn = styled.button`
//   background-color: white;
//   border: 1px solid white;
//   margin: 0px 105px 0px 8px;
// `;

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

// const Star = styled.div`
//   margin-left: 10px;
// `;

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

// const RatingBox = styled.div`
//   margin: 0 auto;

//   & svg {
//     color: #c4c4c4;
//     cursor: pointer;
//   }
//   :hover svg {
//     color: black;
//   }
//   & svg:hover ~ svg {
//     color: #c4c4c4;
//   }
//   .black {
//     color: black;
//   }
// `;

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
