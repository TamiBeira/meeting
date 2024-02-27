import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useMeetingsContext, Meeting } from '../contexts/MeetingsContext';

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
        <li className="border-b border-gray-200 py-2 flex sm:flex-row font-semibold">
          <div className="w-1/5">Título</div>
          <div className="w-1/5">Data</div>
          <div className="w-1/5">Hora</div>
          <div className="w-1/5">Imagem</div>
          <div className="w-1/5">E-mails</div>
        </li>
        {meetings.map((meeting, index) => (
          <li key={index} className="border-b border-gray-200 py-4 flex flex-col sm:flex-row items-start sm:items-center">
            {editableIndex === index ? (
              <>
                {/* Inputs para edição */}
              </>
            ) : (
              <>
                <div className="w-1/5">{meeting.title}</div>
                <div className="w-1/5">{meeting.data}</div>
                <div className="w-1/5">{meeting.hora}</div>
                <div className="w-1/5">
                  <img src={meeting.imagem} alt="Imagem da reunião" width={50} height={50} className="max-w-xs mx-auto mt-2" />
                </div>
                <div className="w-1/5">{Array.isArray(meeting.emails) ? meeting.emails.join(', ') : ''}</div>
                <div>
                  {/* Botões de edição/remoção */}
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
