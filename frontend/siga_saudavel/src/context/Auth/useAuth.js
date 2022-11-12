import { useContext } from 'react';
import { AuthContext } from './Context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}
