import React from "react";
import styled from "styled-components";
import HomeSearch from "../../components/Home/HomeSearch";
import CampingSearch from "../../components/Search/CampingSearch";

function CampSearch() {
  return (
    <div>
      <SearchWindow>
        <HomeSearch color="var(--Brand5)"/>
      </SearchWindow>
      <CampingSearch />
    </div>
  );
}
export default CampSearch;

const SearchWindow = styled.div`
  padding-top: 24px;
`
