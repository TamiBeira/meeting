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
  handleDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleHoraChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleImagemChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
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

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleHoraChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHora(event.target.value);
  };

  const handleImagemChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImagem(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
  
    // Extrair a data e a hora do formato do campo de entrada de datetime-local
    const selectedDateTime = new Date(`${data}T${hora}`);
    const formattedDate = selectedDateTime.toLocaleDateString('pt-BR');
    const formattedTime = selectedDateTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
    // Criação dos dados da reunião
    const meetingData = {
      title,
      data: formattedDate,
      hora: formattedTime,
      imagem,
      emails
    };
  
    // Verifica se há dados previamente armazenados na localStorage
    const existingData = localStorage.getItem('meetingData');
    let allMeetings = [];
  
    if (existingData) {
      // Se houver, recupera os dados e converte para objeto JavaScript
      allMeetings = JSON.parse(existingData);
    }
  
    // Verifica se a data e hora já estão sendo usadas
    const isDuplicate = allMeetings.some((meeting: any) => meeting.data === formattedDate && meeting.hora === formattedTime);
  
    if (isDuplicate) {
      toast.error('Esta data e hora já estão sendo usadas por outra reunião.');
    } else {
      // Adiciona os novos dados à lista de todas as reuniões
      allMeetings.push(meetingData);
  
      // Salva a lista atualizada na localStorage
      localStorage.setItem('meetingData', JSON.stringify(allMeetings));
  
      // Envio de e-mails para os participantes
      const emailText = `Detalhes da Reunião:
        Título: ${title}
        Data: ${formattedDate}
        Hora: ${formattedTime}
        ...`;
      emails.forEach((email) => {
        sendEmail(email, 'Detalhes da Reunião', emailText);
      });
  
      // Limpa os campos após o salvamento
      setData('');
      setHora('');
      setImagem('');
      setTitle('');
      setEmailInput('');
      setEmails([]);
  
      // Exibe mensagem de sucesso
      toast.success('Reunião cadastrada com sucesso e e-mails enviados!');
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
        handleDataChange,
        handleHoraChange,
        handleImagemChange,
        handleTitleChange,
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
