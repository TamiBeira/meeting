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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Extrair a data e a hora do formato do campo de entrada de datetime-local
    const selectedDateTime = new Date(`${data}T${hora}`);
    const formattedDate = selectedDateTime.toLocaleDateString('pt-BR');
    const formattedTime = selectedDateTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
    // Seu código para salvar os dados da reunião...
  
    // Envio de e-mails para os participantes
    const emailText = `Detalhes da Reunião:
      Título: ${title}
      Data: ${formattedDate}
      Hora: ${formattedTime}
      ...`;
    emails.forEach((email) => {
      sendEmail(email, 'Detalhes da Reunião', emailText);
    });
  
    // Limpar os campos após o envio
    setData('');
    setHora('');
    setImagem('');
    setTitle('');
    setEmailInput('');
    setEmails([]);
  
    toast.success('Reunião cadastrada com sucesso e e-mails enviados!');
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
