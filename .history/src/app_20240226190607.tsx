import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import { Form } from './components/Form';
import { MeetingsView } from './components/MeetingsView';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <FormProvider>
            <Form />
          </FormProvider>
        </Route>
        <Route path="/meetings">
          <MeetingsView />
        </Route>
      </Switch>
    </Router>
  );
};

