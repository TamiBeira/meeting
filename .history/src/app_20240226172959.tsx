import { FormProvider } from './contexts/FormContext';
import { Form } from './components/Form';
import { MeetingsView } from './components/MeetingsView';w

export const App = () => {
  return (
    <FormProvider>
      <Form />
      <MeetingsView />
    </FormProvider>
  );
};
