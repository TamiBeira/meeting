import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import { Form } from './components/Form';
import { MeetingsView } from './components/MeetingsView';
import {HomePage} from './components/HomePage'; 

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormProvider><Form /></FormProvider>} />
        <Route path="/meetings" element={<MeetingsView />} />
      </Routes>
    </Router>
  );
};
