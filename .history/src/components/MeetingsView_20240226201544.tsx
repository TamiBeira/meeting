import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useMeetingsContext } from '../contexts/MeetingsContext';

export const MeetingsView: React.FC = () => {
  const {
    meetings,
    editableIndex,
    editedMeeting,
    handleEdit,
    handleSave,
    handleDelete,
    handleInputChange,
  } = useMeetingsContext();

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Reuniões</h2>
      <div className="mt-4">
        <Link to="/meetings" className="text-blue-500 font-bold mr-2">Ver Reuniões Cadastradas</Link>
        <Link to="/" className="text-blue-500 font-bold">Voltar para a Página Inicial</Link>
      </div>
      <ul>
        {meetings.map((meeting, index) => (
          <li key={index} className="border-b border-gray-200 py-4 flex flex-col sm:flex-row items-start sm:items-center">
            {editableIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedMeeting.title}
                  onChange={(e) => handleInputChange(e, 'title')}
                  className="mb-2 sm:mb-0 mr-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Título"
                />
                <input
                  type="date"
                  value={editedMeeting.data}
                  onChange={(e) => handleInputChange(e, 'data')}
                  className="mb-2 sm:mb-0 mr-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="time"
                  value={editedMeeting.hora}
                  onChange={(e) => handleInputChange(e, 'hora')}
                  className="mb-2 sm:mb-0 mr-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={editedMeeting.imagem}
                  onChange={(e) => handleInputChange(e, 'imagem')}
                  className="mb-2 sm:mb-0 mr-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="URL da Imagem"
                />
                <input
                  type="text"
                  value={editedMeeting.emails.join(', ')}
                  onChange={(e) => handleInputChange(e, 'emails')}
                  className="mb-2 sm:mb-0 mr-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="E-mails"
                />
                <div>
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
                  <strong>E-mails:</strong> {Array.isArray(meeting.emails) ? meeting.emails.join(', ') : ''}
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 font-bold py-2 px-4 mr-2 rounded"
                  >
                    <FaEdit className="inline-block mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 font-bold py-2 px-4 rounded"
                  >
                    <FaTrash className="inline-block mr-1" />
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
