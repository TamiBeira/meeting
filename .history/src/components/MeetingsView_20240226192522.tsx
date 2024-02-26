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
          <li key={index} className="border-b border-gray-200 py-4">
            {editableIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedMeeting.title}
                  onChange={(e) => handleInputChange(e, 'title')}
                  className="block w-full px-4 py-2 mb-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="date"
                  value={editedMeeting.data}
                  onChange={(e) => handleInputChange(e, 'data')}
                  className="block w-full px-4 py-2 mb-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="time"
                  value={editedMeeting.hora}
                  onChange={(e) => handleInputChange(e, 'hora')}
                  className="block w-full px-4 py-2 mb-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={editedMeeting.imagem}
                  onChange={(e) => handleInputChange(e, 'imagem')}
                  className="block w-full px-4 py-2 mb-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={editedMeeting.emails.join(', ')}
                  onChange={(e) => handleInputChange(e, 'emails')}
                  className="block w-full px-4 py-2 mb-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  >
                    Salvar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <strong>Título:</strong> {meeting.title}
                </div>
                <div className="mb-2">
                  <strong>Data:</strong> {meeting.data}
                </div>
                <div className="mb-2">
                  <strong>Hora:</strong> {meeting.hora}
                </div>
                <div className="mb-2">
                  <strong>Imagem:</strong> 
                  <img src={meeting.imagem} alt="Imagem da reunião" width={150} height={100} className="max-w-xs mx-auto mt-2" />
                </div>
                <div className="mb-2">
                  <strong>E-mails:</strong> {meeting.emails.join(', ')}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 font-bold mr-2"
                  >
                    <FaEdit className="inline-block mr-1" /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 font-bold"
                  >
                    <FaTrash className="inline-block mr-1" /> Excluir
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
