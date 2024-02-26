import React, { ReactNode, createContext, useContext, useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react";
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
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleImagemChange = (event) => {
    setImagem(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  };

  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleAddEmail = () => {
    setEmails([...emails, emailInput]);
    setEmailInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de envio do formulário...
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
        handleDataChange,
        handleImagemChange,
        handleTitleChange,
        handleHoraChange,
        handleEmailInputChange,
        handleAddEmail,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
