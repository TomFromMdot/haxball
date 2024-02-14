import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import './index.css';

import ErrorPage from './pages/ErrorPage';
import Ranking from './pages/Ranking';

import SideNav from './components/global/SideNav';

import { ConfigProvider, theme } from 'antd';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
});
const rootElement = document.getElementById('root');

const routes = [
  {
    path: '/',
    element: <Navigate to="/ranking/RS/points" replace />,
    errorElement: <ErrorPage />,
    showSideNav: true,
  },
  {
    path: '/ranking/:room/:category',
    element: <Ranking />,
    errorElement: <ErrorPage />,
    showSideNav: true,
  },
];

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <ApolloProvider client={client}>
          <Routes>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <div className="flex">
                    {!route.showSideNav || <SideNav />}
                    {route.element}
                  </div>
                }
                errorElement={route.errorElement}
              />
            ))}
          </Routes>
        </ApolloProvider>
      </ConfigProvider>
    </BrowserRouter>,
  );
}
