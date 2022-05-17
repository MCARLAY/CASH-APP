import React, { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  Activity,
  Dashboard,
  LandingPage,
  MyCash,
  Settings,
} from './components';

import { fakeUser } from './mocks';
import LoginPage from './components/Login/LoginPage';
import { useAppSelector } from './store';

export interface ContainerProps {}

const Container: FC<ContainerProps> = () => {
  const loggedIn = useAppSelector((state) => state.auth?.token);

  const displayLoggedOut = () => (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='*'
        element={
          <Navigate
            replace
            to={`/login?return_to=${window.location.pathname}`}
          />
        }
      />
    </Routes>
  );

  const displayLoggedIn = () => (
    <Routes>
      <Route path='/account' element={<Dashboard user={fakeUser} />}>
        <Route path='activity' element={<Activity user={fakeUser} />} />
        <Route path='mycash' element={<MyCash user={fakeUser} />} />
        <Route path='settings' element={<Settings user={fakeUser} />} />
      </Route>

      <Route path='*' element={<Navigate replace to='/account/activity' />} />
    </Routes>
  );

  return loggedIn ? displayLoggedIn() : displayLoggedOut();
};

export default Container;
