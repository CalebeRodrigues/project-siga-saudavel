import { AuthContext } from './Context';
import { useStorage } from '../../util/useStorage';
import { LoginRequest } from './utils';

// eslint-disable-next-line
export const AuthProvider = ({ children }) => {
  const [ token, setToken ] = useStorage('token');

  const authenticate = async (email, senha) => {
    const response = await LoginRequest(email, senha);

    const payload = response ? { token: response.ID, email, nome: response.nome, nick: response.nick } : null;

    setToken(payload);
    return payload != null;
  };

  const logout = async () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={
        {
          ...token,
          authenticate,
          logout
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
