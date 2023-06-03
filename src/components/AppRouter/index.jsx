import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout
import Layout from '../Layout';

import { routes } from '../../router';

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} exact={route.exact} />
        ))}
      </Routes>
    </Layout>
  );
};

export default AppRouter;
