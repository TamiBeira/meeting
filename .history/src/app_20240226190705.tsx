import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import { Form } from './components/Form';
import { MeetingsView } from './components/MeetingsView';

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <FormProvider>
          <Form />
        </FormProvider>
      </Route>
      <Route path="/meetings">
        <MeetingsView />
      </Route>
    </Router>
  );
};

export default App;
