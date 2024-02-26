import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

export interface Meeting {
  title: string;
  data: string;
  hora: string;
  imagem: string;
  imagemPath?: string;
  emails: string[];
}

interface MeetingsContextType {
  meetings: Meeting[];
  editableIndex: number | null;
  editedMeeting: Meeting;
  handleEdit: (index: number) => void;
  handleSave: () => void;
  handleDelete: (index: number) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, key: string) => void;
}

interface MeetingContextProviderProps {
  children: React.ReactNode;
}

const MeetingsContext = createContext<MeetingsContextType | undefined>(undefined);

export const useMeetingsContext = () => {
  const context = useContext(MeetingsContext);
  if (!context) {
    throw new Error('useMeetingsContext must be used within a MeetingsProvider');
  }
  return context;
};

export const MeetingsProvider: React.FC<MeetingContextProviderProps> = ({ children }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editedMeeting, setEditedMeeting] = useState<Meeting>({
    title: '',
    data: '',
    hora: '',
    imagemPath: '',
    emails: [],
  });

  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetingData');
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  const handleEdit = (index: number) => {
    setEditableIndex(index);
    setEditedMeeting(meetings[index]);
    toast.success('Reunião editada com sucesso!');
  };

  const handleSave = () => {
    if (editableIndex === null) return;

    const updatedMeetings = [...meetings];
    updatedMeetings[editableIndex] = editedMeeting;
    setMeetings(updatedMeetings);
    localStorage.setItem('meetingData', JSON.stringify(updatedMeetings));
    setEditableIndex(null);
    setEditedMeeting({
      title: '',
      data: '',
      hora: '',
      imagemPath: '',
      emails: [],
    });
    toast.success('Reunião salva com sucesso!');
  };

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta reunião?');
    if (confirmDelete) {
      const updatedMeetings = [...meetings];
      updatedMeetings.splice(index, 1);
      setMeetings(updatedMeetings);
      localStorage.setItem('meetingData', JSON.stringify(updatedMeetings));
      toast.success('Reunião excluída com sucesso!');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditedMeeting({ ...editedMeeting, [key]: event.target.value });
  };

  const contextValue: MeetingsContextType = {
    meetings,
    editableIndex,
    editedMeeting,
    handleEdit,
    handleSave,
    handleDelete,
    handleInputChange,
  };

  return (
    <MeetingsContext.Provider value={contextValue}>
      {children}
    </MeetingsContext.Provider>
  );
};
