import React, { useState, useEffect } from "react";

import { instance } from "../../api/axiosApi";

import styled from "styled-components";

import testImg from "../../img/test_camp_img.jpg"

import { BoxHeader, BoxName, ItemBox } from "../elements/ItemBox";
import { Link } from "react-router-dom";
import CampImgView from "../elements/CampImgView";


function MyCamp() {
  const [myCamp, setMyCamp] = useState(null);
  const fetchCamp = async () => {
    try {
      const { data } = await instance.get(`mycamp`);
      setMyCamp(data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchCamp();
  }, [])
  console.log(myCamp)
  const category = ['Atag', 'Btag', 'Ctag', 'Dtag']
  return (
    <ItemBox>
      {myCamp?.map((v) => {
        return (
          <ItemBox>
            <ListImg img={testImg} />
            <ItemBox>
              <BoxHeader>
                <BoxName>{v.campingName}</BoxName>
                <CountView>{v.reviewCount}개의 리뷰</CountView>
              </BoxHeader>
              <AddressBox>{v.address1} {v.address2} {v.address3}</AddressBox>
            </ItemBox>
            <hr></hr>
            <ItemBox>
              <TagBox>
                {v.tagCategory.map((v) => {
                  return (
                    <CategoryTag>{v}</CategoryTag>
                  )
                })}
              </TagBox>
            </ItemBox>
          </ItemBox>
        )
      })}
    </ItemBox>
  )
}

export default MyCamp;

const ListImg = styled(CampImgView)`
  height: 150px;
`

const CategoryTag = styled.div`
  border-radius: 50px;
  border: 1px solid black;
  padding: var(--pad1) var(--pad2)  var(--pad1)  var(--pad2) ;
  flex-wrap: wrap;
  font-size: 12px;
`

const TagBox = styled.div`
  display: flex;
  gap: var(--pad2);
`

const CountView = styled.div`
  background-color: lightgrey;
  font-size: 10px;
  font-weight: bold;
  padding: var(--pad1);
`

const AddressBox = styled.div`
  padding: var(--pad1);
  font-size: 14px;
  color: gray;
`