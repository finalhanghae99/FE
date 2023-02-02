import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { instance } from "../../api/axiosApi";
import { ItemBox, BoxHeader, BoxName, BoxMoreLink } from "../elements/ItemBox";
import ReserveListElement from "../Reserve/ReserveListElement";

function HomeReserve() {
  const [reserve, setReserve] = useState(null);
  const fetchReserve = async () => {
    try {
      const { data } = await instance.get("reservation/listsix");
      setReserve(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReserve();
  }, []);
  return (
    <ItemBox>
      <BoxHeader>
        <BoxName>캠핑장 양도</BoxName>
        <BoxMoreLink to="reserve/search"></BoxMoreLink>
      </BoxHeader>
      <ReserveBox>
        {reserve?.map((v) => {
          return <ReserveListElement key={v.reservationId} reserve={v} />;
        })}
        {reserve?.length === 0 && (
          <NotFount>등록된 양도글이 없습니다.</NotFount>
        )}
      </ReserveBox>
    </ItemBox>
  );
}

export default HomeReserve;

const ReserveBox = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 16px;
  padding-bottom: var(--interval);
`;

const NotFount = styled.div`
  text-align: center;
`;
