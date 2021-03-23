import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { setOpenpost } from '../../modules/openpost';
import PostContainer from '../post/PostContainer';

const ModalForm = styled.div`
  .modal-wrapper {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);

    .cancel {
      font-size: 200px;
      color: white;
    }
    .modal {
      background: rgba(0, 0, 0, 0.4);
      border-radius: 5px;
      width: 70%;
      height: 80%;
      overflow: scroll;
      .p {
        font-size: 16px;
      }
    }
    .cancel {
      cursor: pointer;
    }
    .modal::-webkit-scrollbar {
      width: 15px;
    }
    .modal::-webkit-scrollbar-thumb {
      background-color: grey;

      border-radius: 10px;
    }
    .modal::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 10px;
    }
    .modal::-webkit-scrollbar-corner {
      display: none;
    }
  }
`;

const OpenPost = () => {
  const dispatch = useDispatch();
  const { openpost } = useSelector(({ openpost }) => ({
    openpost: openpost.openpost,
  }));
  const onCancel = () => {
    dispatch(setOpenpost(null));
  };
  useEffect(() => {
    dispatch(setOpenpost(null));
  }, [dispatch]);
  if (openpost !== null) {
    return (
      <ModalForm>
        <div className="modal-wrapper">
          <div className="modal">
            <PostContainer postId={openpost} />
          </div>
          <div className="cancel" onClick={onCancel}>
            <AiOutlineCloseCircle
              style={{
                position: 'absolute',
                marginTop: '-260px',
                marginLeft: '-90px',
                fontSize: '30px',
                color: 'white',
              }}
            />
          </div>
        </div>
      </ModalForm>
    );
  } else {
    return <></>;
  }
};
export default OpenPost;
