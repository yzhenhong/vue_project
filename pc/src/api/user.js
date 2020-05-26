import ajax from '@/utils/ajax';

export function login(username, password) {
  const data = {
    username,
    password
  };
  return ajax.post('/api/login/account ', data);
}

export function getAdminInfo() {
  return ajax.get('/api/user/info');
}