import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as RouterProvider } from 'react-router-dom';
import Root from './containers/Root';
import apolloClient from './api';

const $root = document.querySelector('#∇');

const App = (
  <RouterProvider>
    <ApolloProvider client={apolloClient}>
      <Root />
    </ApolloProvider>
  </RouterProvider>
);

render(App, $root);

module.hot.accept();
