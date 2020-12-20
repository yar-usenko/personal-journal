import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import Normalize from '@zenkit/normalize';

import styled from 'styled-components';
import RobotoFlex from '../assets/fonts/roboto-flex';

const Block = styled.div`
  font-family: 'Roboto Flex';
`;

function Home() {
  return (
    <Block>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry&apos;s standard dummy text ever since
      the 1500s, when an unknown printer took a galley of type and scrambled it
      to make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Block>
  );
}

function About() {
  return <h2>q</h2>;
}

function Users() {
  return <h2>sdfgsdfg</h2>;
}

function Root() {
  return (
    <div>
      <Normalize />
      <RobotoFlex />
      <Helmet>
        <body className="body" />
      </Helmet>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default Root;
