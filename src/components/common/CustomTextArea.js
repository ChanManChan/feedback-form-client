import styled from 'styled-components';
import React from 'react';
import { useField } from 'formik';

const TextArea = styled.textarea.attrs({ rows: 5, required: true })`
  display: block;
  width: 100%;
  border: none;
  border-bottom: 2px solid #d1c4e9;
  padding: 10px 10px 10px 5px;
  font-size: 18px;
  font-family: inherit;
  color: ${(p) => p.theme.bodyFontColor};
  resize: none;
  background: none;
  &:focus {
    outline: none;
  }
  /*"&:valid ~ label" works because of "required: true" in "attrs" */
  &:focus ~ label,
  &:valid ~ label {
    top: -14px;
    font-size: 12px;
  }
  /* increase the bottom line width (animation) */
  &:focus ~ span:before {
    width: 100%;
  }
`;

const Label = styled.label`
  color: ${(p) =>
    p.errorText && p.errorText.length > 0 ? '#f44336' : p.theme.bodyFontColor};
  font-size: 1rem;
  font-weight: normal;
  font-family: inherit;
  pointer-events: none;
  position: absolute;
  top: 10px;
  left: 10px;
  transition: all 300ms ease;
`;

const Span = styled.span`
  position: relative;
  display: block;
  width: 100%;
  &:before {
    content: '';
    height: 2px;
    width: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    background: ${(p) =>
      p.errorText && p.errorText.length > 0 ? '#f44336' : '#2196f3'};
    transition: all 300ms ease;
  }
`;

const TextAreaWrapper = styled.div`
  position: relative;
  margin: 1rem;
  font-family: 'Open Sans';
  width: 100%;
`;
export const CustomTextArea = ({ labelText, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextAreaWrapper>
      <TextArea {...field} />
      <Span errorText={errorText} />
      <Label errorText={errorText}>
        {errorText && errorText.length > 0 ? errorText : labelText}
      </Label>
    </TextAreaWrapper>
  );
};
