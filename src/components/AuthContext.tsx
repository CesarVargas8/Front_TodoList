import { createContext, FC, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ApiRepository } from '../data/repository';
import { User } from '../models/userData';

interface AuthContextData {
  user: User | undefined;
  login: (userName: string, password: string) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  const login = async (userName: string, password: string) => {
    //Se realizara la peticion al API
    const response = await ApiRepository.validateLogin({
      data: {
        user: userName,
        password
      }
    });

    if (response.error) {
      alert(response.mensaje);

      return;
    }
    setUser(response.data);
    navigate('/principal', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: (userName, password) => void login(userName, password)
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
