import React from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useMeetingsContext } from '../contexts/MeetingsContext';
import { Meeting } from './types'; // Certifique-se de importar o tipo Meeting adequado

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

      <div className="flex justify-between mb-4">
        <Link to="/" className="text-blue-500 font-bold">Voltar para a Página Inicial</Link>
        <Link to="/form" className="text-blue-500 font-bold">Cadastrar Reuniões</Link>
      </div>

      <ul>
        {meetings.map((meeting: Meeting, index: number) => (
          <li key={index} className="border-b border-gray-200 py-4 flex flex-col sm:flex-row items-start sm:items-center">
            {editableIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedMeeting.title || ''}
                  onChange={(e) => handleInputChange(e, 'title')}
                  className="mb-2 sm:mb-0 mr-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {/* Restante dos inputs de edição */}
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
                {/* Restante dos detalhes da reunião */}
                <div>
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
