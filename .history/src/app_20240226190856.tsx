import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './contexts/FormContext';
import { Form } from './components/Form';
import { MeetingsView } from './components/MeetingsView';
import HomePage from './components/HomePage'; // Importe a HomePage aqui

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Defina a HomePage como rota principal */}
        <Route path="/form" element={<FormProvider><Form /></FormProvider>} />
        <Route path="/meetings" element={<MeetingsView />} />
      </Routes>
    </Router>
  );
};
