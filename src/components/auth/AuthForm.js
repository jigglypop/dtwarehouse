import React from 'react';
import styled from 'styled-components';
import BlueButton from '../common/BlueButton';

const IdInput = styled.input`
  font-size: 1rem;
  outline: none;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  border-style: solid;
  border-image-slice: 1;
  background: none;
  border-color: white;
  color: white;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthDiv = styled.div`
  .under {
    text-align: center;
    font-size: 15px;
    font-weight: 800;
    color: white;
    span {
      color: #8e2de2;
      font-weight: 800;
      cursor: pointer;
    }
  }
`;

export default function AuthForm({
  form,
  onChange,
  onSubmit,
  error,
  onSubmitNormal,
}) {
  return (
    <AuthDiv>
      <div>
        <IdInput
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          placeholder="ID"
          name="username"
          autoComplete="username"
          onChange={onChange}
          value={form.username}
          autoFocus
        />
        {error && (
          <ErrorMessage>
            요청에 실패했습니다. 올바르게 입력해 주세요
          </ErrorMessage>
        )}
        <BlueButton type="submit" onClick={onSubmit}>
          입장하기
        </BlueButton>
        <h4 className="under" type="submit">
          기업회원이 아니신가요?{' '}
          <span onClick={onSubmitNormal}>일반회원으로 입장하기</span>
        </h4>
      </div>
    </AuthDiv>
  );
}
