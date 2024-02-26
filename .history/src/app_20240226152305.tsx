import React from 'react';
import { FormProvider } from './contexts/FormContext';
import { Form } from './components/Form';

export const App = () => {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
};
