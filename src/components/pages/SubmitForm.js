import React from 'react';
import { Layout, Button, CustomField } from 'components/common';

export default function SubmitForm() {
  const handleValidation = (e) => {
    const states = ['valid', 'not-valid'];
    let classes;
    if (e.target.value.length === 0) classes = states[1];
    else classes = states[0];
    e.target.nextElementSibling.classList.remove(...states);
    e.target.nextElementSibling.classList.add(classes);
  };

  return (
    <Layout>
      <CustomField
        label='Enter you Email'
        type='text'
        onBlur={handleValidation}
        onChange={handleValidation}
      />
      <Button large secondary>
        Testing children prop
      </Button>
    </Layout>
  );
}
