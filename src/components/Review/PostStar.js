import React ,{useEffect, useState }from "react";

import styled from "styled-components";
import { ImStarFull } from "react-icons/im";

function PostStar({setScore}) {
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
    setScore(score)
  },[score])

  const starArr = [];
  for (let i = 0; i < 5; i++) {
    starArr.push(
      <Star key={i}>
        <RatingBox>
          <ImStarFull
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
  margin-left: 10px;
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
