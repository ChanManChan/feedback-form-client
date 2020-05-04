import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const largeStyles = ({ large }) => {
  if (large)
    return css`
      padding: 15px 30px;
      font-size: 15px;
    `;
  else
    return css`
      padding: 10px 20px;
      font-size: 10px;
    `;
};

const Button = styled.button`
  text-transform: uppercase;
  margin:1rem;
  border:none;
  background-color: ${(p) =>
    p.secondary ? p.theme.secondaryColor : p.theme.primaryColor};
  color: #fff;
  ${largeStyles}
  letter-spacing:2px;
  position: relative;
  cursor: pointer;
  &:before {
    content: '${(p) => p.children}';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2ce771;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: top;
    transform: rotateX(270deg);
    transition: transform 0.20s;
  }
  &:after {
    content: '${(p) => p.children}';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: bottom;
    transform: rotateX(270deg);
    transition: transform 0.20s;
    transition-delay: 0.20s;
  }
  &:hover:before,
  &:hover:after {
    transform: rotateX(0deg);
  }
  &:disabled {
    background: #eee;
    color: #666;
    &:before,
    &:after {
      display: none;
    }
  }
`;

Button.propTypes = {
  large: PropTypes.bool,
  secondary: PropTypes.bool,
};

export { Button };
