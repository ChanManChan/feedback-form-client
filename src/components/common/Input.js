import React from 'react';
import styled from 'styled-components';
import { LightenDarkenColor } from 'components/common';

const Label = styled.label`
  position: absolute;
  top: 1.3rem;
  left: 1rem;
  font-size: 0.9rem;
  color: ${(p) => p.theme.bodyFontColor};
  transition: font-size 0.2s ease, top 0.2s ease;
  &.valid {
    font-size: 0.6rem;
    top: 0.5rem;
  }
`;

const Input = styled.input`
  padding: 1.3rem 1rem 0.9rem 1rem;
  flex: 1;
  border-color: ${(p) => p.theme.secondaryColor};
  border-radius: 5px;
  background-color: ${(p) => p.theme.bodyBackgroundColor};
  color: ${(p) => p.theme.bodyFontColor};
  font-size: 1.2rem;
  &:focus {
    background-color: ${(p) =>
      p.theme.id === 'dark'
        ? LightenDarkenColor(p.theme.bodyBackgroundColor, 50)
        : LightenDarkenColor(p.theme.bodyBackgroundColor, -50)};
    + ${Label} {
      font-size: 0.6rem;
      color: ${(p) => p.theme.bodyFontColor};
      top: 0.5rem;
    }
  }
`;

const Field = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
  position: relative;
`;

export function CustomField({ label, ...props }) {
  return (
    <Field className='field-container'>
      <Input {...props} />
      <Label>{label}</Label>
    </Field>
  );
}
