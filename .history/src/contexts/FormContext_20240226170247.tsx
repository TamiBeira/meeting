import React, { ReactNode, createContext, useContext, useState, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface MeetingDataProps {
  data: string;
  hora: string;
  imagem: string;
  title: string;
  emails: string[];
}

interface MeetingContextDataProps extends MeetingDataProps {
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
  
    if (data.trim() === '' || horaInicio.trim() === '' || horaFim.trim() === '') {
      toast.error('Por favor, preencha os campos de data e hora.');
      return;
    }

    // Verifica se os valores de data e hora são válidos
    const selectedDateTime = new Date(`${data}T${hora}`);
    if (isNaN(selectedDateTime.getTime())) {
      toast.error('Por favor, insira uma data e hora válidas.');
      return;
    }

    const formattedDate = selectedDateTime.toLocaleDateString('pt-BR');
    const formattedTime = selectedDateTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const meetingData: MeetingDataProps = {
      title,
      data: formattedDate,
      hora: formattedTime,
      imagem,
      emails
    };

    const existingData = localStorage.getItem('meetingData');
    let allMeetings: MeetingDataProps[] = [];

    if (existingData) {
      allMeetings = JSON.parse(existingData);
    }

    const isDuplicate = allMeetings.some((meeting) => meeting.data === formattedDate && meeting.hora === formattedTime);

    if (isDuplicate) {
      toast.error('Esta data e hora já estão sendo usadas por outra reunião.');
    } else {
      allMeetings.push(meetingData);

      localStorage.setItem('meetingData', JSON.stringify(allMeetings));

      const emailText = `Detalhes da Reunião:
        Título: ${title}
        Data: ${formattedDate}
        Hora: ${formattedTime}
        ...`;
      emails.forEach((email) => {
        sendEmail(email, 'Detalhes da Reunião', emailText);
      });

      setData('');
      setHora('');
      setImagem('');
      setTitle('');
      setEmailInput('');
      setEmails([]);

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
