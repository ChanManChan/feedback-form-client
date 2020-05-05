import styled from 'styled-components';

/**The "mix-blend-mode" CSS property sets how an element's content should blend with the content of the element's parent and the element's background. */

const CloudinaryButton = styled.button`
  margin: 1rem;
  width: 100%;
  height: 100px;
  text-transform: uppercase;
  background-color: transparent;
  text-align: center;
  line-height: 60px;
  border: none;
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  color: #fff;
  transition: all 0.2s;
  &:before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    background-color: #20caff;
    z-index: -1;
    mix-blend-mode: ${(p) => (p.theme.id === 'dark' ? 'normal' : 'multiply')};
    transform-origin: top;
    transition: all 0.2s;
  }
  &:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 100%;
    height: 100%;
    background-color: #ff7675;
    z-index: -1;
    mix-blend-mode: ${(p) => (p.theme.id === 'dark' ? 'normal' : 'multiply')};
    transition: all 0.2s;
    transform-origin: bottom;
  }
  &:hover:before {
    top: -6px;
    left: 0;
    transform: perspective(1000px) rotateX(75deg);
  }
  &:hover:after {
    top: 6px;
    left: 0;
    transform: perspective(1000px) rotateX(-75deg);
  }
  &:hover {
    color: ${(p) => p.theme.bodyFontColor};
  }
`;

export { CloudinaryButton };
