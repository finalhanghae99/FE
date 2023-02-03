import React from "react";
import styled from "styled-components";
import ReviewEditForm from "../../components/Review/ReviewEditForm";

function ReviewEdit() {
  return (
    <ReviewPage>
      <ReviewEditForm />
    </ReviewPage>
  );
}

export default ReviewEdit;

const ReviewPage = styled.div`
  background-color: var(--BackColor2);
`;
