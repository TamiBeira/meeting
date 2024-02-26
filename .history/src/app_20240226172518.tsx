import { FormProvider } from './contexts/FormContext';
import { Form } from './components/Form';
import { Calendar } from './components/Calendar';

export const App = () => {
  return (
    <FormProvider>
      <Form />
      <Calendar />
    </FormProvider>
  );
};
