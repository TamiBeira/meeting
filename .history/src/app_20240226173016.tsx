import { FormProvider } from './contexts/FormContext';
import { Form } from './components/Form';
import { MeetingsView } from './components/MeetingsView';

export const App = () => {
  return (
    <FormProvider>
      <Form />
      <MeetingsView />
    </FormProvider>
  );
};
