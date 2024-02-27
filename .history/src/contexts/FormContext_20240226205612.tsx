import React, { createContext, useState, ChangeEvent, FormEvent, ReactNode } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface MeetingContextDataProps {
  data: string;
  hora: string;
  imagem: string;
  title: string;
  emails: string[];
  emailInput: string;
  handleDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleHoraChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEmailInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddEmail: () => void;
  handleRemoveEmail: (index: number) => void;
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
  const [title, setTitle] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleHoraChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHora(event.target.value);
  };

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  const handleAddEmail = () => {
    setEmails([...emails, emailInput]);
    setEmailInput('');
  };

  const handleRemoveEmail = (index: number) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const selectedDateTime = new Date(`${data}T${hora}`);
    const formattedDate = selectedDateTime.toLocaleDateString('pt-BR');
    const formattedTime = selectedDateTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
    const meetingData = {
      title,
      data: formattedDate,
      hora: formattedTime,
      emails
    };
  
    const existingData = localStorage.getItem('meetingData');
    let allMeetings: any[] = [];
  
    if (existingData) {
      allMeetings = JSON.parse(existingData);
    }
  
    const isDuplicate = allMeetings.some((meeting: any) => {
      const sameDateAndTime = meeting.data === formattedDate && meeting.hora === formattedTime;
      const sameEmails = meeting.emails.length === emails.length && meeting.emails.every((email: string) => emails.includes(email));
      return sameDateAndTime && sameEmails;
    });
  
    if (isDuplicate) {
      toast.error('Esta data, hora e lista de e-mails já estão sendo usadas por outra reunião.');
    } else {
      allMeetings.push(meetingData);
  
      localStorage.setItem('meetingData', JSON.stringify(allMeetings));
  
      setData('');
      setHora('');
      setTitle('');
      setEmailInput('');
      setEmails([]);
  
      toast.success('Reunião cadastrada com sucesso!');
    }
  };
  
  return (
    <FormContext.Provider
      value={{
        data,
        hora,
        imagem: '',
        title,
        emails,
        emailInput,
        handleDataChange,
        handleTitleChange,
        handleHoraChange,
        handleEmailInputChange,
        handleAddEmail,
        handleRemoveEmail,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
