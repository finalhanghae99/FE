import React from "react";
import styled from "styled-components";

import { BsPencilFill, BsBookmark } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";

function CampImgView(props) {
  const { img } = props
  return (
    // <ImageWindow style={{position:"relative"}} className={props.className}>
      <ImgFrame className={props.className}>
        <ImgView src={img} />
      </ImgFrame>
      // {/* <BackBtn /> */}
    // </ImageWindow>
  )
}
export default CampImgView;

const ImageWindow = styled.div`
  position: "relative";
  /* height: 100px; */
`

const ImgFrame = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  &:after {
    height: 100px;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 1;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0)  40% ,rgba(255, 255, 255, 0.5)  60% , white 100%);
  };
`
const ImgView = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  background-color: blue;
  object-position: center;
`

const BackBtn = styled(AiOutlineLeft)`
    position: absolute;
    top:10%;
    left:10%;
    transform: translate(-50%,-50%);
    padding:0;
    margin:0;
    font-size:30px;
    filter: drop-shadow(10px 10px 10px 10px green);
    /* box-shadow: 0px 0px 10px 0px black; */
`