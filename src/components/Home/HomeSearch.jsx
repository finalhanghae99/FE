import React, { startTransition, useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import RegionWindow from "../elements/RegionWindow";

function HomeSearch() {
  const region = useModal();
  if(region.isOpen){
    document.body.style.position='fixed';
    document.body.style.width = "100%"
  }else {
    document.body.style.position='';
  }
  const initalCondtion = {
    keyword : "",
    address1 : "",
    address2 : "",
  }
  const [condition, setCondition] = useState(initalCondtion)

  const changeHandler = (event) =>{
    const { name, value } = event.target;
    setCondition({...condition, [name] : value})
  }

  return (
    <SearchBox>
      <BtnBox>
        <MapBtn onClick={region.onOpen}>지도 검색</MapBtn>
      </BtnBox>
      <WordInput name="keyword" value={condition.keyword} onChange={changeHandler}/>
      <SearchBottom>
        <RegionSelect >
        </RegionSelect>
        <SertchBtn>검색</SertchBtn>
      </SearchBottom>
      {region.isOpen && <RegionWindow name="address1" value={condition.address1} onChange={changeHandler} onClose={region.onClose} />}
    </SearchBox>
  )
}
export default HomeSearch;

// export default function App() {
//   + const { isOpen, onClose, onOpen } = useModal();
//     return (
//       <div className="App">
//   +   <button onClick={onOpen} type="button" className="button openButton">
//           Open Modal
//         </button>
//   +     {isOpen && <Modal onClose={onClose} />}
//       </div>
//     );
//   }

const SearchBox = styled.div`
  padding: var(--pad2);
`
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`
const MapBtn = styled.button`
  width: 80px;
  height: 30px;
`

const WordInput = styled.input`
  height: 30px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: var(--pad1);
  margin-top: var(--pad1);
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

const SertchBtn = styled.button`
  width: 80px;
  height: 30px;
  flex:1;
`