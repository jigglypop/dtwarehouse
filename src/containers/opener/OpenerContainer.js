import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setOpener } from '../../modules/opener';

import { AiOutlineCloseCircle } from 'react-icons/ai';

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
      background: rgba(0, 0, 0, 0.8);
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

const OpenerContainer = () => {
  const dispatch = useDispatch();
  const { opener } = useSelector(({ opener }) => ({
    opener: opener.opener,
  }));
  const onCancel = () => {
    dispatch(setOpener(null));
  };
  useEffect(() => {
    dispatch(setOpener(null));
  }, [dispatch]);
  if (opener !== null) {
    return (
      <ModalForm>
        <div className="modal-wrapper">
          <div className="modal">
            {/* {opener === 'write' && <WriteContainer />}
            {opener === 'painting' && <PaintingContainer />}
            {opener === 'default' && <DefaultContainer />}
            {opener === 'award' && <AwardContainer />}
            {opener === 'rank' && <RankContainer />} */}
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
    return null;
  }
};

export default OpenerContainer;
