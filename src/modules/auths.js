import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'autsh/CHANGE_FIELD';
const INITIALIZE_FORM = 'auths/INITIALIZE_FORM';
const INITIALIZE_AUTH = 'auths/INITIALIZE_AUTH';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auths/REGISTER',
);

const [PROFILE] = createRequestActionTypes('auth/PROFILE');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auths/LOGIN',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);

const SOCIAL_CHANGE = 'auths/SOCIAL_CHANGE';
export const socialChange = createAction(
  SOCIAL_CHANGE,
  ({ form, username, nickname, email, password }) => ({
    form,
    nickname,
    username,
    email,
    password,
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const register = createAction(
  REGISTER,
  ({ username, email, nickname, password }) => ({
    nickname,
    username,
    email,
    password,
  }),
);

export const profile = createAction(
  PROFILE,
  ({ username, nickname, email, user, user_image }) => ({
    nickname,
    username,
    email,
    user,
    user_image,
  }),
);

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const profileSaga = createRequestSaga(PROFILE, authAPI.profile);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authsSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(PROFILE, profileSaga);
}

const initialState = {
  register: {
    nickname: '',
    username: '',
    email: '',
    password: '',
  },
  login: {
    nickname: '',
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auths = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [SOCIAL_CHANGE]: (
      state,
      { payload: { form, nickname, username, email, password } },
    ) => ({
      ...state,
      [form]: {
        username: username,
        nickname: nickname,
        email: email,
        password: password,
      },
      authError: null,
    }),
    [INITIALIZE_AUTH]: (state) => ({
      ...state,
      auth: null,
    }),

    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),

    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),

    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),

    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),

    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auths;
