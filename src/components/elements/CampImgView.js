import React from "react";
import styled from "styled-components";
import { AiOutlineLeft } from "react-icons/ai";

function CampImgView(props) {
  const { img } = props
  return (
    // <ImageWindow style={{position:"relative"}} className={props.className}>
      <ImgFrame className={props.className}>
        {img === "" ? 
          <div style={{ backgroundColor: "var(--Gray2)", textAlign: "center", lineHeight: "414px" }}>
          이미지를 준비중이에요.
        </div>
          : <ImgView src={img} />
        }
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
  height: 407px;
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
    opacity: 0.5;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0)  40% ,rgba(0, 0, 0, 0.5)  60% , black 100%);
  };
`
const ImgView = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
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
`