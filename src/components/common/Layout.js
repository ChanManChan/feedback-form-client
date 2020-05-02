import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';

const Content = styled.main`
  max-width: 1200px;
  margin: 80px auto 0 auto;
  padding: 0 16px;
  font-family: 'Open Sans';
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Kaushan Script';
  }
`;

export function Layout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}
