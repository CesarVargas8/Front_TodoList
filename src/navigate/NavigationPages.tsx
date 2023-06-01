import { FC, PropsWithChildren } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider, useAuth } from '../components/AuthContext';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/login' replace={true} />;
  }

  return <>{children}</>;
};

export const NavigationPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthProvider />}>
          <Route index element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/principal'
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
