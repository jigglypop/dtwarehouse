import axios from 'axios';
import { server_url } from './server_url';

// 로그인
export const login = ({ username, password }) => {
  return axios
    .post(server_url + '/api/auth/login/', { username, password: '1127star' })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

// 회원가입
export const register = ({ username, email, password }) => {
  return axios
    .post(server_url + '/api/auth/register/', {
      username,
      email,
      password,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
};
// 프로필 생성
export const profile = ({ username, nickname, email, user, user_image }) => {
  return axios
    .post(server_url + '/api/profile/', {
      username,
      nickname,
      email,
      user,
      user_image,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

// 프로필 보기
export const readProfile = (id) => {
  return axios
    .get(server_url + `/api/profile/${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};
// 프로필 업데이트

export const updateProfile = ({ user, nickname, description, user_image }) => {
  return axios
    .patch(server_url + `/api/profile/${user}/`, {
      nickname,
      description,
      user_image,
    })
    .then((res) => {
      return res;
    });
};

// 내 프로필 보기
export const readMyprofile = (id) => {
  return axios
    .get(server_url + `/api/profile/${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};
// 내 프로필 업데이트

export const updateMyprofile = ({
  user,
  nickname,
  description,
  user_image,
}) => {
  return axios
    .patch(server_url + `/api/profile/${user}/`, {
      nickname,
      description,
      user_image,
    })
    .then((res) => {
      return res;
    });
};

// 권한
export const check = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = JSON.parse(localStorage.getItem('token'));
  headers['Authorization'] = `Token ${token}`;
  return axios
    .get(server_url + '/api/auth/user/', { headers })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

// 로그아웃
export const logout = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = JSON.parse(localStorage.getItem('token'));
  headers['Authorization'] = `Token ${token}`;
  return axios(server_url + '/api/auth/logout/', {
    headers,
    body: '',
    method: 'post',
  });
};

// 랭크
export const rankPosts = () => {
  return axios
    .get(server_url + '/api/bestcount/')
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};
// 방명록
export const removeGuestbook = (profileid) => {
  console.log('삭제');
  return axios
    .delete(server_url + `/api/guestbook/${profileid}/`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};

export const createGuestbook = ({ commenter, name, text, profileid }) => {
  return axios
    .post(server_url + '/api/guestbook/', {
      commenter,
      name,
      text,
      profileid,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return e;
    });
};
