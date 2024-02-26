import React,  { ReactNode, createContext, useContext, useState } from "react";

export interface MeetingContextDataProps {

}
interface MeetingContextProviderProps{
    children: ReactNode;
}

const FormContext = createContext();

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