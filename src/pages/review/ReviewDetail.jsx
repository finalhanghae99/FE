import React from "react";
import styled from "styled-components";
import ReviewDetailForm from "../../components/Review/ReviewDetailForm";

function ReviewDetail() {
  return (
    <ReviewPage>
      <ReviewDetailForm />
    </ReviewPage>
  );
}

export default ReviewDetail;

const ReviewPage = styled.div`
  background-color: var(--BackColor2);
`;
