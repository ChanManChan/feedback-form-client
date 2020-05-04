import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

const Input = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  font-size: inherit;
  font-family: inherit;
  padding: 0 15px;
  border: none;
  border-bottom: 2px solid
    ${(p) => (p.errorText && p.errorText.length > 0 ? '#f44336' : '#d1c4e9')};
  color: ${(p) => p.theme.bodyFontColor};
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  &::-webkit-input-placeholder {
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }
  &::-moz-placeholder {
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }
  /* placeholder text color when focused */
  &:focus::-webkit-input-placeholder {
    color: #767676;
    opacity: 1;
    transition-delay: 0.2s;
  }
  &:focus::-moz-placeholder {
    color: #767676;
    opacity: 1;
    transition-delay: 0.2s;
  }
  &:focus {
    outline: none;
  }
  /* When the placeholder is not shown (ie. there is some input field text present), then hide the incoming "label" */
  &:not(:placeholder-shown) ~ span > span {
    opacity: 0;
    bottom: 15px;
  }
`;

const Label = styled.label`
  display: inline-block;
  width: 100%;
  position: relative;
  font-size: 1rem;
  font-family: 'Open Sans';
  /*"padding-top" was added to make room for the upward animated for the "label" */
  padding-top: 1.7rem;
  margin: 1rem;
  & > span {
    /* Container for the border pseudo element and the "label" */
    width: 100%;
    height: 50px;
    cursor: text;
    position: absolute;
    bottom: 0;
    left: 0;
    &:after {
      /* The Rectangular border that shows up when input field is focused*/
      content: '';
      width: 100%;
      height: 0;
      opacity: 0;
      border: 2px solid #673ab7;
      position: absolute;
      bottom: 0;
      left: 0;
      /* The will-change CSS property hints to browsers how an element is expected to change. Browsers may set up optimizations before an element is actually changed. These kinds of optimizations can increase the responsiveness of a page by doing potentially expensive work before they are actually required. */
      will-change: opacity, height;
      transition: height 0.2s ease-out, opacity 0.2s ease-out;
    }
    & > span {
      /* Incoming "label"(not the placeholder) */
      position: absolute;
      left: 10px;
      /*"bottom: calc(50% - 0.5rem)" <- position the incoming "label" when the input not focused (vertically center) */
      bottom: calc(50% - 0.5rem);
      color: ${(p) =>
        p.errorText && p.errorText.length > 0
          ? '#f44336'
          : p.theme.bodyFontColor};
      line-height: 1;
      font-size: 1rem;
      margin-bottom: 0;
      pointer-events: none;
      transition: bottom 0.2s cubic-bezier(0.9, -0.15, 0.1, 1.15),
        opacity 0.2s ease-out, margin-bottom 0.2s ease-out 0.2s;
      will-change: bottom, opacity, margin-bottom;
    }
  }
  /* When Input field is focused, reveal the Rectangular border */
  & > ${Input}:focus ~ span:after {
    height: 100%;
    opacity: 1;
  }
  /* Move the imcoming "label" upward when input field is focused*/
  & > ${Input}:focus ~ span > span {
    opacity: 1;
    bottom: 50px;
    margin-bottom: 0.2rem;
  }
`;

export function CustomField({ placeholder, label, ...props }) {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <Label errorText={errorText}>
      <Input {...field} placeholder={placeholder} errorText={errorText} />
      <span>
        <span>{errorText && errorText.length > 0 ? errorText : label}</span>
      </span>
    </Label>
  );
}
