export const MeetingsProvider: React.FC<MeetingContextProviderProps> = ({ children }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editedMeeting, setEditedMeeting] = useState<Meeting>({
    title: '',
    data: '',
    hora: '',
    imagem: '', // Adicione a propriedade imagem
    imagemPath: '', // Adicione a propriedade imagemPath
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
      imagem: '',
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
