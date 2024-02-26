import React, { useState, useContext, useEffect, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importe aqui o seu contexto de reunião
import { MeetingContextDataProps } from "./SeuContextoDeReuniao";

const FormContext = createContext({} as MeetingContextDataProps);

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }: MeetingContextProviderProps) => {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [imagem, setImagem] = useState<File | null>(null); // Alterado para aceitar File
  const [title, setTitle] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleImagemChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImagem(event.target.files[0]); // Armazena o arquivo de imagem selecionado
    }
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

    // Lógica para salvar a imagem e obter sua URL
    let imagemUrl = ''; // URL da imagem a ser salva no localStorage
    if (imagem) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Aqui você pode enviar a imagem para o servidor ou salvar localmente
        // Neste exemplo, estou apenas convertendo-a em uma URL base64
        imagemUrl = e.target?.result as string;
        const meetingData = {
          title,
          data: formattedDate,
          hora: formattedTime,
          imagem: imagemUrl, // Aqui você armazena a URL da imagem
          emails
        };

        // Salve os dados da reunião no localStorage ou envie para o servidor
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
          setImagem(null);
          setTitle('');
          setEmailInput('');
          setEmails([]);
  
          toast.success('Reunião cadastrada com sucesso e e-mails enviados!');
        }
      };
      reader.readAsDataURL(imagem); // Converte a imagem para base64
    } else {
      toast.error('Por favor, selecione uma imagem.');
    }
  };

  return (
    <FormContext.Provider
      value={{
        data,
        hora,
        imagem: imagem ? URL.createObjectURL(imagem) : '', // Cria a URL da imagem
        title,
        emails,
        emailInput,
        handleDataChange,
        handleImagemChange,
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
