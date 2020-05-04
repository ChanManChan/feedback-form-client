import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link as ReactRouterDomLink, useLocation } from 'react-router-dom';
import { Toggle } from './Toggle';

const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  display: flex;
  padding: 0 16px;
  position: fixed;
  top: 0;
  z-index: 1;
  background-image: linear-gradient(
    to right,
    ${(p) => p.theme.primaryColor},
    ${(p) => p.theme.secondaryColor}
  );
  border-bottom: 3px solid ${(p) => p.theme.secondaryColor};
`;

const MobileMenuIcon = styled.div`
  margin: auto 0 auto auto;
  width: 25px;
  min-width: 25px;
  padding: 5px;
  > div {
    height: 3px;
    background: ${(p) => p.theme.bodyFontColor};
    margin: 5px 0;
    width: 100%;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const Link = ({ isActive, children, ...props }) => (
  <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>
);
const StyledLink = styled(Link)`
  width: 110px;
  height: 40px;
  margin: auto 0;
  color: ${(p) => (p.isActive ? p.theme.bodyFontColor : ' #ff0')};
  background-color: transparent;
  font-size: 16px;
  text-decoration: none;
  text-align: center;
  line-height: 40px;
  transition: all 0.5s;
  position: relative;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(p) => (p.isActive ? p.theme.bodyFontColor : ' #ff0')};
    transform: translateY(-50%);
    transition: all 0.5s;
    z-index: -1;
    opacity: 0;
  }
  &:before {
    left: 0;
    box-shadow: -50px 0 0
      ${(p) => (p.isActive ? p.theme.bodyFontColor : ' #ff0')};
  }
  &:after {
    right: 0;
    box-shadow: 50px 0 0
      ${(p) => (p.isActive ? p.theme.bodyFontColor : ' #ff0')};
  }
  &:hover:before {
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 15px 0 0
      ${(p) => (p.isActive ? p.theme.bodyFontColor : ' #ff0')};
    opacity: 1;
  }
  &:hover:after {
    right: 50%;
    transform: translateX(50%) translateY(-50%);
    box-shadow: -15px 0 0
      ${(p) => (p.isActive ? p.theme.bodyFontColor : ' #ff0')};
    opacity: 1;
  }
  > span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(p) => (p.isActive ? p.theme.bodyFontColor : ' #ff0')};
    border-radius: 4px;
    transform: scale(0);
    transition: all 0.3s;
    z-index: -1;
  }
  &:hover > span {
    transform: scale(1);
    transition-delay: 0.4s;
  }
  &:hover {
    color: ${(p) => (p.isActive ? p.theme.bodyBackgroundColor : '#262626')};
    transition-delay: 0.4s;
  }
`;
const Menu = styled.nav`
  display: ${(p) => (p.open ? 'block' : 'none')};
  width: 100%;
  font-family: 'Open Sans';
  position: absolute;
  top: 60px;
  left: 0;
  padding: 8px;
  border-bottom: 3px solid ${(p) => p.theme.secondaryColor};
  background: ${(p) => p.theme.bodyBackgroundColor};
  @media (min-width: 768px) {
    display: flex;
    position: relative;
    border-bottom: none;
    width: initial;
    background: none;
    left: initial;
    top: initial;
    margin: auto 0 auto auto;
    > ${StyledLink}:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
`;

export function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { id, switchTheme } = useContext(ThemeContext);
  return (
    <HeaderWrapper>
      <MobileMenuIcon onClick={() => setMenuOpen((s) => !s)}>
        <div />
        <div />
        <div />
      </MobileMenuIcon>
      <Menu open={menuOpen}>
        <StyledLink to='/' isActive={pathname === '/'}>
          <span></span>Home
        </StyledLink>
        <StyledLink to='/form' isActive={pathname === '/form'}>
          <span></span>Feedback
        </StyledLink>
        <StyledLink to='/about' isActive={pathname === '/about'}>
          <span></span>About
        </StyledLink>
        <Toggle isActive={id === 'dark'} onToggle={switchTheme} />
      </Menu>
    </HeaderWrapper>
  );
}
