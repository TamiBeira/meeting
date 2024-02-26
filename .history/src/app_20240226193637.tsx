import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import { MeetingsProvider } from './contexts/MeetingsContext'; // Importe o provedor MeetingsProvider
import { Form } from './components/Form';
import { MeetingsView } from './components/MeetingsView';
import { HomePage } from './components/HomePage'; 

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormProvider><Form /></FormProvider>} />
        <Route path="/meetings" element={<MeetingsProvider><MeetingsView /></MeetingsProvider>} /> {/* Envolver o componente MeetingsView com o provedor MeetingsProvider */}
      </Routes>
    </Router>
  );
};
