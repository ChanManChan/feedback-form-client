import React from 'react';
import {
  Layout,
  Button,
  CustomField,
  CustomTextArea,
  CloudinaryButton,
} from 'components/common';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  const {
    REACT_APP_API,
    REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  } = process.env;

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
        axios({
          method: 'POST',
          url: `${REACT_APP_API}/feedback`,
          data,
        })
          .then((response) => {
            if (response.data.success) {
              resetForm();
              toast.success(response.data.message, {
                position: toast.POSITION.BOTTOM_LEFT,
              });
            } else
              toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_LEFT,
              });
            setSubmitting(false);
            setText({
              buttonText: 'Submit',
              uploadPhotosButtonText: 'Upload files',
            });
          })
          .catch((err) => {
            setSubmitting(false);
            setText({
              buttonText: 'Submit',
              uploadPhotosButtonText: 'Upload files',
            });
            toast.error('Something went wrong', {
              position: toast.POSITION.BOTTOM_LEFT,
            });
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FieldArray name='uploadedFiles'>
            {(arrayHelpers) => (
              <CloudinaryButton
                onClick={() => {
                  window.cloudinary.openUploadWidget(
                    {
                      cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME,
                      upload_preset: REACT_APP_CLOUDINARY_UPLOAD_PRESET,
                      tags: ['ebooks'],
                    },
                    function (error, result) {
                      //! returns the "secure_url" of the uploaded images
                      //! send this entire "result" array to our back-end
                      if (result && !error) {
                        result.map((url) => arrayHelpers.push(url));
                        setText((cs) => ({
                          ...cs,
                          uploadPhotosButtonText: `${result.length} photos uploaded`,
                        }));
                      }
                    }
                  );
                }}
              >
                {uploadPhotosButtonText}
              </CloudinaryButton>
            )}
          </FieldArray>
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

  return (
    <Layout>
      <h1>Feedback Form</h1>
      {FeedbackForm()}
    </Layout>
  );
}
