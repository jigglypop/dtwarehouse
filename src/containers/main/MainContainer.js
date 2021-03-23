import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setOpener } from '../../modules/opener';
import LoginForm from '../auth/LoginForm';

const ModalForm = styled.div`
  .modal-wrapper {
    position: fixed;
    z-index: 3000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.95);

    .cancel {
      font-size: 200px;
      color: white;
    }
    .modal {
      background: linear-gradient(
        to right,
        rgba(18, 194, 233, 0.1),
        rgba(196, 113, 237, 0.1),
        rgba(246, 79, 89, 0.1)
      );
      display: flex;
      z-index: 3000;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      width: 100%;
      height: 100%;
      overflow: scroll;
      .p {
        font-size: 16px;
      }
    }
  }
`;
const LoginItem = styled.div`
  .colorberry {
    margin-top: 150px;
    padding-bottom: 10px;
    padding-top: 30px;
    font-size: 3vmax;
    font-weight: 800;
    color: white;
    animation: blink 2s ease-in-out infinite alternate;
    text-align: center;
    @keyframes blink {
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .inner {
    background: rgba(0, 0, 0, 0.3);
    margin-top: -150px;
    padding: 0 10vw 100px 10vw;
  }
  .under {
    text-align: center;
    font-size: 15px;
    font-weight: 800;
    color: white;
    span {
      color: #8e2de2;
      font-weight: 800;
    }
  }
`;

const EnterPage = () => {
  return (
    <>
      <LoginItem>
        <div className="inner">
          <h1 className="colorberry">DT 물류센터 시뮬레이터</h1>
          <div>
            <LoginForm />
          </div>
        </div>
      </LoginItem>
    </>
  );
};

const MainContainer = () => {
  const dispatch = useDispatch();
  const { myprofile } = useSelector(({ myprofile }) => ({
    myprofile: myprofile.myprofile,
  }));
  const onCancel = () => {
    dispatch(setOpener(null));
  };
  useEffect(() => {
    dispatch(setOpener('write'));
  }, [dispatch]);

  if (myprofile === null) {
    return (
      <ModalForm>
        <div className="modal-wrapper">
          <div className="modal">
            <EnterPage />
          </div>
          <div onClick={onCancel}></div>
        </div>
      </ModalForm>
    );
  } else {
    return null;
  }
};

export default MainContainer;
