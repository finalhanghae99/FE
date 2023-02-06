import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BoxName } from "../elements/ItemBox";
import CampImgView from "../elements/CampImgView";
import { instance } from "../../api/axiosApi";
import { ReactComponent as bmkFill } from "../../img/icons/bmkFill.svg";
import { ReactComponent as bmkLine } from "../../img/icons/bmkLine.svg";
import { getCookies } from "../../api/cookieControler";
import Alert from "../elements/Alert";
import Confirm from "../elements/Confirm";

function CampListElement(props) {
  const navigate = useNavigate();
  const { camp } = props;
  const [isBMK, setIsBMK] = useState(camp.campingLikeState);
  const clickBMK = async (event, id) => {
    event.stopPropagation();
    const token = getCookies("id");
    if (!token) {
      const isConfirm = await Confirm({
        body: "로그인이 필요 합니다.\n 로그인 하시겠습니까?"
      })
      if (!isConfirm) {
        return null;
      } else {
        navigate("../../login");
      }
      return;
    }
    try {
      const { data } = await instance.post(`/camping/${id}/like`);
      setIsBMK(!isBMK);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListBox
      onClick={() => {
        navigate(`../campdetail/${camp.campingId}`);
      }}
    >
      <div style={{ position: "relative" }}>
        {camp.imageUrl === "" ? (
          <>
            <ListDiv>이미지를 준비중이에요.</ListDiv>
            <BookmarkBtn
              onClick={(event) => {
                clickBMK(event, camp.campingId);
              }}
            >
              {isBMK ? (<BMKFill color="black" />) : (<BMKLine color="black" />)}
            </BookmarkBtn>
          </>
        ) : (
          <>
            <ListImg img={camp.imageUrl} />
            <BookmarkBtn
              onClick={(event) => {
                clickBMK(event, camp.campingId);
              }}
            >
              {isBMK ? (<BMKFill color="white" />) : (<BMKLine color="white" />)}
            </BookmarkBtn>
          </>
        )}

        <CountView>{camp.reviewCount}개 리뷰</CountView>
      </div>
      <CradsDetail>
        <DetailHeader>
          <DetailName>{camp.campingName}</DetailName>
        </DetailHeader>
        <AddressBox>{camp.address3}</AddressBox>
        <TagBox>
          {camp.campingEnv?.map((v, i) => {
            return <CategoryTag key={i}>{v}</CategoryTag>;
          })}
          {camp.campingType?.map((v, i) => {
            return <CategoryTag key={i}>{v}</CategoryTag>;
          })}
          {camp.campingFac?.map((v, i) => {
            return <CategoryTag key={i}>{v}</CategoryTag>;
          })}
        </TagBox>
      </CradsDetail>
    </ListBox>
  );
}

export default CampListElement;

const CradsDetail = styled.div`
  margin: var(--interval);
  box-sizing: border-box;
  height: 110px;
  overflow: hidden;
`;

const ListBox = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  border: 2px solid var(--Gray2);
`;

const ListImg = styled(CampImgView)`
  height: 150px;
`;

const ListDiv = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--Gray2);
`;

const CategoryTag = styled.div`
  border-radius: 50px;
  line-height: 24px;
  height: 24px;
  background-color: var(--BackColor2);
  padding: var(--pad1) var(--pad2) var(--pad1) var(--pad2);
  flex-wrap: nowrap;
  font-size: 12px;
  text-overflow: ellipsis;
  margin-bottom: 12px;
`;

const TagBox = styled.div`
  display: flex;
  gap: var(--pad2);
  padding-top: var(--interval);
  width: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const DetailHeader = styled.div`
  padding-bottom: 8px;
  display: flex;
`;

const DetailName = styled(BoxName)`
  flex: 5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const CountView = styled.div`
  background-color: white;
  font-size: 10px;
  font-weight: bold;
  padding: var(--pad1) var(--pad2) var(--pad1) var(--pad2);
  border-radius: 4px;
  flex: 1;
  text-align: center;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const AddressBox = styled.div`
  height: 20px;
  font-size: 14px;
  color: gray;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const BookmarkBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  z-index: 5;
`;

const BMKFill = styled(bmkFill)`
  & path{
  stroke: ${props => props.color};
  fill: ${props => props.color};
  }

`

const BMKLine = styled(bmkLine)`
  & path{
    stroke: ${props => props.color};
  }
`