import React from 'react';
import { FormProvider } from './contexts/FormContext';
import { Form } from './components/Form';

const App = () => {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
};

export default App;