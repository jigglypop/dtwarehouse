import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
  MINIPOST_POSTS,
  MINIPOST_POSTS_SUCCESS,
  MINIPOST_POSTS_FAILURE,
] = createRequestActionTypes('minipost/MINIPOST_POSTS');
const CLEAR_NEXT = createRequestActionTypes('minipost/CLEAR_NEXT');
const ART_NEXT = createRequestActionTypes('minipost/ART_NEXT');

export const minipostPosts = createAction(MINIPOST_POSTS, page => page);
export const clearNext = createAction(CLEAR_NEXT);
export const artNext = createAction(ART_NEXT, nextPage => nextPage);
export function* minipostSaga() {
  yield takeLatest(
    MINIPOST_POSTS,
    createRequestSaga(MINIPOST_POSTS, postsAPI.minipostPosts),
  );
}

const initialState = {
  minipost: [],
  next: '',
  error: null,
  nextPage: [],
};

const minipost = handleActions(
  {
    [MINIPOST_POSTS_SUCCESS]: (state, { payload: minipost }) => ({
      ...state,
      minipost: state.minipost.concat(minipost.results),
      next: minipost.next,
    }),
    [MINIPOST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CLEAR_NEXT]: state => ({
      ...state,
      next: '',
    }),
    [ART_NEXT]: (state, { payload: nextPage }) => ({
      ...state,
      nextPage: state.nextPage.concat(nextPage),
    }),
  },
  initialState,
);

export default minipost;
