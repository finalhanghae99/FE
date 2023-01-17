import React from "react";
import LikeReviewForm from "../../components/Review/LikeReviewForm";

import styled from "styled-components";

function LikeReview() {
  return (
    <BackColor>
      <LikeReviewForm />
    </BackColor>
  )
}

export default LikeReview;

const BackColor = styled.div`
  background-color: var(--BackColor2);
`