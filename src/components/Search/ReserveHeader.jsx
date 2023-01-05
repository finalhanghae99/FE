import React from "react";
import styled from "styled-components";

function ReserveHeader() {
  return (
    <SearchBox>
      <SearchBottom>
        <RegionSelect>
          <option>지역</option>
        </RegionSelect>
        <RegionSelect>
          <option>지역</option>
        </RegionSelect>
      </SearchBottom>
    </SearchBox>
  )
}
export default ReserveHeader;

const SearchBox = styled.div`
  padding: var(--pad2);
`

const SearchBottom = styled.div`
  display: flex;
  margin-top: var(--pad1);  
`

const RegionSelect = styled.select`
  height: 30px;
  flex: 3;
  margin-right: var(--pad1);
`
