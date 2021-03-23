import React, { useState } from 'react';
import RemoveModal from './RemoveModal';
import BlueButton from '../common/BlueButton';

const PostButton = ({ onRemove }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <BlueButton onClick={onRemoveClick}>삭제</BlueButton>

      <RemoveModal visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  );
};

export default PostButton;
