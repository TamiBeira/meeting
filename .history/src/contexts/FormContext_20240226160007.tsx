import React, { ReactNode, createContext, useContext, useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface MeetingContextDataProps {
  data: string;
  hora: string;
  imagem: string;
  title: string;
  emails: string[];
  emailInput: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>, setterFunction: Dispatch<SetStateAction<string>>) => void;
  handleEmailInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddEmail: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

interface MeetingContextProviderProps {
  children: ReactNode;
}

const FormContext = createContext({} as MeetingContextDataProps);

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }: MeetingContextProviderProps) => {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [imagem, setImagem] = useState('');
  const [title, setTitle] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, setterFunction: Dispatch<SetStateAction<string>>) => {
    setterFunction(event.target.value);
  };

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  const handleAddEmail = () => {
    if (emailInput.trim() !== '') {
      setEmails([...emails, emailInput.trim()]);
      setEmailInput('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedDate = new Date(data).toLocaleDateString('pt-BR');
    const formattedTime = hora.split(':').map((val, index) => index === 0 ? val.padStart(2, '0') : val.padEnd(2, '0')).join(':');
    const meetingData = {
      title,
      data: formattedDate,
      hora: formattedTime,
      imagem,
      emails
    };

    // Verificando campos obrigatórios
    if (!data || !hora || !title || emails.length === 0) {
      toast.error('Por favor, preencha todos os campos obrigatórios para prosseguir.');
    } else {
      localStorage.setItem('meetingData', JSON.stringify(meetingData));
      toast.success('Reunião cadastrada com sucesso!');
      setData('');
      setHora('');
      setImagem('');
      setTitle('');
      setEmailInput('');
      setEmails([]);
    }
  };

  return (
    <FormContext.Provider
      value={{
        data,
        hora,
        imagem,
        title,
        emails,
        emailInput,
        handleInputChange,
        handleEmailInputChange,
        handleAddEmail,
        handleSubmit,
      }}
    >
      {children}
      <ToastContainer />
    </FormContext.Provider>
  );
};
