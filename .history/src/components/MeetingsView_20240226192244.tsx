import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const MeetingsView = () => {
  const [meetings, setMeetings] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedMeeting, setEditedMeeting] = useState({});

  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetingData');
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  const handleEdit = (index) => {
    setEditableIndex(index);
    setEditedMeeting(meetings[index]);
    toast.success('Reunião editada com sucesso!');
  };

  const handleSave = () => {
    const updatedMeetings = [...meetings];
    updatedMeetings[editableIndex] = editedMeeting;
    setMeetings(updatedMeetings);
    localStorage.setItem('meetingData', JSON.stringify(updatedMeetings));
    setEditableIndex(null);
    setEditedMeeting({});
    toast.success('Reunião salva com sucesso!');
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta reunião?');
    if (confirmDelete) {
      const updatedMeetings = [...meetings];
      updatedMeetings.splice(index, 1);
      setMeetings(updatedMeetings);
      localStorage.setItem('meetingData', JSON.stringify(updatedMeetings));
      toast.success('Reunião excluída com sucesso!');
    }
  };

  const handleInputChange = (event, key) => {
    setEditedMeeting({ ...editedMeeting, [key]: event.target.value });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Reuniões</h2>
      
      <Link to="/" className="text-blue-500 font-bold mb-4 block">Voltar para a Página Inicial</Link>
      <Link to="/form" className="text-blue-500 font-bold mb-4 mr-2 block">Cadastrar reuniões</Link>

      <ul>
        {meetings.map((meeting, index) => (
          <li key={index} className="border-b border-gray-200 py-4 flex flex-col sm:flex-row items-center">
            {editableIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedMeeting.title}
                  onChange={(e) => handleInputChange(e, 'title')}
                  className="mr-4 px-2 py-1 border rounded mb-2 sm:mb-0"
                />
                <input
                  type="date"
                  value={editedMeeting.data}
                  onChange={(e) => handleInputChange(e, 'data')}
                  className="mr-4 px-2 py-1 border rounded mb-2 sm:mb-0"
                />
                <input
                  type="time"
                  value={editedMeeting.hora}
                  onChange={(e) => handleInputChange(e, 'hora')}
                  className="mr-4 px-2 py-1 border rounded mb-2 sm:mb-0"
                />
                <input
                  type="text"
                  value={editedMeeting.imagem}
                  onChange={(e) => handleInputChange(e, 'imagem')}
                  className="mr-4 px-2 py-1 border rounded mb-2 sm:mb-0"
                />
                <input
                  type="text"
                  value={editedMeeting.emails.join(', ')}
                  onChange={(e) => handleInputChange(e, 'emails')}
                  className="mr-4 px-2 py-1 border rounded mb-2 sm:mb-0"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 mr-2 rounded"
                >
                  Salvar
                </button>
              </>
            ) : (
              <>
                <div className="mb-2 sm:mb-0">
                  <strong>Título:</strong> {meeting.title}
                </div>
                <div className="ml-4 mb-2 sm:mb-0">
                  <strong>Data:</strong> {meeting.data}
                </div>
                <div className="ml-4 mb-2 sm:mb-0">
                  <strong>Hora:</strong> {meeting.hora}
                </div>
                <div className="ml-4 mb-2 sm:mb-0">
                  <strong>Imagem:</strong> 
                  <img src={meeting.imagem} alt="Imagem da reunião" width={150} height={100} className="max-w-xs mx-auto mt-2" />
                </div>
                <div className="ml-4 mb-2 sm:mb-0">
                  <strong>E-mails:</strong> {meeting.emails.join(', ')}
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 font-bold py-1 px-2 mr-2 rounded flex items-center mb-2 sm:mb-0"
                  >
                    <FaEdit className="mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 font-bold py-1 px-2 rounded flex items-center"
                  >
                    <FaTrash className="mr-1" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};
