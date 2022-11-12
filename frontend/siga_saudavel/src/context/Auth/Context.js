import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  authenticate: async (email, senha) => {},
  logout: () => {},
});
