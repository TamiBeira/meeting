import React,  { ReactNode, createContext, useContext, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface MeetingContextDataProps {
  data: string;
  hora: string;
  imagem: string;
  title: string;
  emails: string[];
  emailInput: string;
  handleDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImagemChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleHoraChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddEmail: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
interface MeetingContextProviderProps{
    children: ReactNode;
}

const FormContext = createContext({} as MeetingContextDataProps);

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }:MeetingContextProviderProps) => {
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
      const formattedDate = new Date(data).toLocaleDateString('pt-BR');
      const formattedTime = hora.split(':').map((val, index) => index === 0 ? val.padStart(2, '0') : val.padEnd(2, '0')).join(':');
      const formattedDateTime = `${formattedDate} ${formattedTime}`;
      const meetingData = {
          title,
          data: formattedDate,
          hora: formattedTime,
          imagem,
          emails
      };
      if (`${data}${hora}${title}${emails}` === "") {
          toast.error('Por favor, preencha todos os campos obrigatórios para prosseguir.');
      }else{
        localStorage.setItem('meetingData', JSON.stringify(meetingData));
        toast.success('Reunião cadastrada com sucesso!');
        setData('');
        setHora('');
        setImagem('');
        setTitle('');
        setEmailInput('');
        setEmails([]);
      }

    }
  
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