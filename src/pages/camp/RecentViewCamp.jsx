import React from "react";
import RecentViewCampForm from "../../components/Camp/RecentViewCampForm";
import styled from "styled-components";

function RecentViewCamp() {
  return(
    <BackColor>
      <RecentViewCampForm />
    </BackColor>
  ) 
}

export default RecentViewCamp;

const BackColor = styled.div`
  background-color:  var(--BackColor2);
`