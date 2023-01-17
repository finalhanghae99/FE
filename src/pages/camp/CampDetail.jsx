import React from "react";
import styled from "styled-components";
import CampDetailForm from "../../components/Camp/CampDetailForm";

function CampDetail(){
  return(
    <CampPage>
      <CampDetailForm />
    </CampPage>
  )
}

export default CampDetail;

const CampPage = styled.div`
  background-color: var(--BackColor2);
`