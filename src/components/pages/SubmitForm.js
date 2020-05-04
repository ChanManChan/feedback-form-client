import React from 'react';
import { Layout, Button, CustomField, CustomTextArea } from 'components/common';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

export default function SubmitForm() {
  const schema = yup.object({
    name: yup.string().required('Please enter you name'),
    email: yup.string().email().required('Please enter your email'),
    description: yup.string().required('Description cannot be empty'),
    phone: yup.number().required('Phone number is required'),
  });

  const [{ buttonText, uploadPhotosButtonText }, setText] = React.useState({
    buttonText: 'Submit',
    uploadPhotosButtonText: 'Upload files',
  });

  const FeedbackForm = () => (
    <Formik
      initialValues={{
        name: '',
        email: '',
        description: '',
        phone: '',
        uploadedFiles: [],
      }}
      validationSchema={schema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setText((cs) => ({ ...cs, buttonText: 'Submitting...' }));
        setTimeout(() => {
          console.table(data);
          setSubmitting(false);
          resetForm();
          setText((cs) => ({ ...cs, buttonText: 'Submit' }));
        }, 3000);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name='name'
            type='text'
            placeholder='Enter your name'
            label='Name'
            as={CustomField}
          />
          <Field
            name='email'
            type='email'
            placeholder='Enter your email'
            label='Email'
            as={CustomField}
          />
          <Field
            name='description'
            labelText='Description'
            as={CustomTextArea}
          />
          <Field
            name='phone'
            type='number'
            placeholder='Enter your phone number'
            label='Phone number'
            as={CustomField}
          />
          <Button large disabled={isSubmitting} type='submit'>
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  );

  return <Layout>{FeedbackForm()}</Layout>;
}
