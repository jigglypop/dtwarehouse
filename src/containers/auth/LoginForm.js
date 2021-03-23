import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { setMyprofile } from '../../modules/myprofile';

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;

    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username } = form;
    dispatch(login({ username, password: '1127star' }));
  };

  const onSubmitNormal = (e) => {
    e.preventDefault();
    const { username } = form;
    console.log('hi');
    dispatch(login({ username: '일반회원', password: '1127star' }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError(authError);
      return;
    }
    if (auth) {
      localStorage.setItem('token', JSON.stringify(auth.token));
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('user_id', JSON.stringify(user.id));
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('current_user', JSON.stringify(user.username));
        localStorage.setItem('posts', JSON.stringify(user.posts));
        dispatch(setMyprofile(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user, dispatch]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      onSubmitNormal={onSubmitNormal}
    />
  );
};

export default withRouter(LoginForm);
