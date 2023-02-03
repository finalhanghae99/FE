import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import styled from "styled-components";

function ModalConfirm({ body, resolve , cleanup}) {
  const [show, setShow] = useState(true);

  const abort = async() => {
    resolve(false)
    await setShow(false)
    cleanup()
  }
  const confirm = async () => {
    resolve(true)
    await setShow(false)
    cleanup()
  }
  if (show) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = '';
  }

  return (
    <div>
      {(show) && (
        <>
          <OutOfModal />
          <ModalWindow>
            <MsgBox>
              {body}
            </MsgBox>
            <BtnBox>
              <WhiteBtn onClick={confirm}>네</WhiteBtn>
              <OrangeBtn onClick={abort}>아니요</OrangeBtn>
            </BtnBox>
          </ModalWindow>
        </>
      )}
    </div>
  )
}

const Confirm = ({ body }) => {
  const alert = ReactDOM.createRoot(document.getElementById('alert'));
  const cleanup =() =>{
    alert.unmount();
  }
  const promise = new Promise((resolve, reject) => {
    try {
      alert.render(
        <ModalConfirm
          body={body}
          resolve={resolve}
          cleanup={cleanup}
        />
      )
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
  return promise;
}

export default Confirm;

const OutOfModal = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  z-index: 50;
`

const ModalWindow = styled.div`
  position: fixed;
  top: 150px;
  justify-content: center;
  z-index: 99;
  background-color: white;
  width: 327px;
  left: 50%;
  transform: translate(-50%, 0%);
`
const MsgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 146px;
  font-size: 18px;
  text-align: center;
  align-content: center;
  white-space: pre-wrap;
`

const BtnBox = styled.div`
  display: flex;
  text-align: center;
  line-height: 50px;
  height: 50px;
`

const WhiteBtn = styled.div`
  background-color: white;
  border: 1px solid var(--Brand6);
  color: var(--Brand6);
  flex: 1;
`

const OrangeBtn = styled.div`
  background-color: var(--Brand6);
  border: 1px solid var(--Brand6);
  color: white;
  flex: 1;
`