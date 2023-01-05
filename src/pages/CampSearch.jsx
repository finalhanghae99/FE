import React from "react";
import styled from "styled-components";
import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../components/elements/ItemBox";
import HomeSearch from "../components/Home/HomeSearch";
import CampingSearch from "../components/Search/CampingSearch";


function CampSearch() {
  return (
    <div>
      <HomeSearch />
      <CampingSearch />
    </div>
  )
}
export default CampSearch;

