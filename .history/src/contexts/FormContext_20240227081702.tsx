import { createContext, useContext, useState, ChangeEvent, FormEvent, ReactNode } from "react";
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
  handleImagemChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
  const [imagem, setImagem] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleImagemChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImagem(event.target.files[0]);
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
  
    const existingData = localStorage.getItem('meetingData');
    let allMeetings: any[] = [];
  
    if (existingData) {
      allMeetings = JSON.parse(existingData);
    }
  
    const duplicateMeeting = allMeetings.find((meeting: any) => {
      const sameDateAndTime = meeting.data === formattedDate && meeting.hora === formattedTime;
      const sameEmails = meeting.emails.some((email: string) => emails.includes(email));
      return sameDateAndTime && sameEmails;
    });
  
    if (duplicateMeeting) {
      if (window.confirm('Já existe uma reunião agendada para o mesmo horário e com os mesmos participantes. Deseja editar a reunião existente para remover os participantes duplicados?')) {
        console.log('Editar reunião existente para remover participantes duplicados...');
        return;
      } else {
        toast.warning('Cadastro cancelado.');
        return;
      }
    }

    let imagemUrl = '';
    if (imagem) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagemUrl = e.target?.result as string;
        const meetingData = {
          title,
          data: formattedDate,
          hora: formattedTime,
          imagem: imagemUrl,
          emails
        };
  
        allMeetings.push(meetingData);
        localStorage.setItem('meetingData', JSON.stringify(allMeetings));
  
        setData('');
        setHora('');
        setImagem(null);
        setTitle('');
        setEmailInput('');
        setEmails([]);
  
        toast.success('Reunião cadastrada com sucesso!');
      };
      reader.readAsDataURL(imagem);
    } else {
      toast.error('Por favor, selecione uma imagem.');
    }
  };
  
  
  return (
    <FormContext.Provider
      value={{
        data,
        hora,
        imagem: imagem ? URL.createObjectURL(imagem) : '',
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
