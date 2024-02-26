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
    // Define o índice do evento que está sendo editado e inicializa o objeto de reunião editada
    setEditableIndex(index);
    setEditedMeeting(meetings[index]);

    // Exibe um toast de sucesso ao editar a reunião
    toast.success('Reunião editada com sucesso!');
  };

  const handleSave = () => {
    // Atualiza a reunião no estado meetings
    const updatedMeetings = [...meetings];
    updatedMeetings[editableIndex] = editedMeeting;
    setMeetings(updatedMeetings);

    // Atualiza o localStorage com os dados atualizados
    localStorage.setItem('meetingData', JSON.stringify(updatedMeetings));

    // Limpa o estado de edição
    setEditableIndex(null);
    setEditedMeeting({});

    // Exibe um toast de sucesso ao salvar a reunião editada
    toast.success('Reunião salva com sucesso!');
  };

  const handleDelete = (index) => {
    // Exibe uma mensagem de confirmação antes de excluir a reunião
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta reunião?');
    if (confirmDelete) {
      // Remove a reunião do estado meetings
      const updatedMeetings = [...meetings];
      updatedMeetings.splice(index, 1);
      setMeetings(updatedMeetings);

      // Atualiza o localStorage com os dados atualizados
      localStorage.setItem('meetingData', JSON.stringify(updatedMeetings));

      // Exibe um toast de sucesso ao excluir a reunião
      toast.success('Reunião excluída com sucesso!');
    }
  };

  const handleInputChange = (event, key) => {
    // Atualiza o valor do campo editado na reunião em edição
    setEditedMeeting({ ...editedMeeting, [key]: event.target.value });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Reuniões</h2>
      
      {/* Adicionando um link para voltar à página inicial */}
      <Link to="/" className="text-blue-500 font-bold mb-4 block">Voltar para a Página Inicial</Link>

      <ul>
        {meetings.map((meeting, index) => (
          <li key={index} className="border-b border-gray-200 py-4 flex items-center">
            {editableIndex === index ? (
              // Renderiza campos de entrada se o índice corresponder ao evento que está sendo editado
              <>
                <input
                  type="text"
                  value={editedMeeting.title}
                  onChange={(e) => handleInputChange(e, 'title')}
                  className="mr-4 px-2 py-1 border rounded"
                />
                <input
                  type="date"
                  value={editedMeeting.data}
                  onChange={(e) => handleInputChange(e, 'data')}
                  className="mr-4 px-2 py-1 border rounded"
                />
                <input
                  type="time"
                  value={editedMeeting.hora}
                  onChange={(e) => handleInputChange(e, 'hora')}
                  className="mr-4 px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  value={editedMeeting.imagem}
                  onChange={(e) => handleInputChange(e, 'imagem')}
                  className="mr-4 px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  value={editedMeeting.emails.join(', ')}
                  onChange={(e) => handleInputChange(e, 'emails')}
                  className="mr-4 px-2 py-1 border rounded"
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
                <div>
                  <strong>Título:</strong> {meeting.title}
                </div>
                <div className="ml-4">
                  <strong>Data:</strong> {meeting.data}
                </div>
                <div className="ml-4">
                  <strong>Hora:</strong> {meeting.hora}
                </div>
                <div className="ml-4">
                  <strong>Imagem:</strong> 
                  <img src={meeting.imagem} alt="Imagem da reunião" width={150} height={100} className="max-w-xs mx-auto mt-2" />
                </div>
                <div className="ml-4">
                  <strong>E-mails:</strong> {meeting.emails.join(', ')}
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className=" text-blue-500 font-bold py-1 px-2 mr-2 rounded flex items-center mb-2 justify-center"
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
