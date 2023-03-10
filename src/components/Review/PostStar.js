import React ,{useEffect, useState }from "react";
import styled from "styled-components";
import {IoStar} from "react-icons/io5"

function PostStar({setScore , initialScore}) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const score = clicked.filter(Boolean).length;

  const starClick = (index) => {
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  useEffect(()=>{
    const initialState = clicked.map((v, i)=>{
      return (i < initialScore)? true : false
    })
    setClicked(initialState)
  },[])
  useEffect(()=>{
    setScore(score)
  },[score])
  const starArr = [];
  for (let i = 0; i < 5; i++) {
    starArr.push(
      <Star key={i}>
        <RatingBox>
          <IoStar
            className={clicked[i] && "black"}
            onClick={() => starClick(i)}
          />
        </RatingBox>
      </Star>
    )
  }

  return (
    <>
      {starArr}
    </>
  )
}

export default PostStar;

const Star = styled.div`
`;

const RatingBox = styled.div`
  margin: 0 auto;

  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }
  :hover svg {
    color: black;
  }
  & svg:hover ~ svg {
    color: #c4c4c4;
  }
  .black {
    color: black;
  }
`;
