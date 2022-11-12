import { Api } from '../../services/api';

export const LoginRequest = async (email, senha) => {
  try {
    const request = await Api.post('/user/login', {
      email,
      senha,
    });

    return request.data;
  } catch (error) {
    return null;
  }
};
