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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        handleInputChange({ target: { value: imageDataUrl } } as React.ChangeEvent<HTMLInputElement>, 'imagem');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Reuniões</h2>
      <div className="mt-4 mb-4">
      <Link to="/form" className="w-40 inline-block text-center border border-solid border-blue-500 text-blue-500 font-bold mr-2 px-4 py-2 rounded">Nova Reunião</Link>
      <Link to="/" className="w-40 inline-block text-center border border-solid border-blue-500 text-blue-500 font-bold px-4 py-2 rounded">Home</Link>
      </div>
      <ul>
        <li className="border-b border-gray-200 py-2 flex sm:flex-row font-semibold">
          <div className="w-1/5">Título</div>
          <div className="w-1/5">Data</div>
          <div className="w-1/5">Hora</div>
          <div className="w-1/5">Imagem</div>
          <div className="w-1/5">E-mails</div>
          <div className="w-1/5">Editar</div>
          <div className="w-1/5">Excluir</div>
        </li>
        {meetings.map((meeting, index) => (
          <li key={index} className="border-b border-gray-200 py-4 flex flex-col sm:flex-row justify-center items-center">
            {editableIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedMeeting.title}
                  onChange={(e) => handleInputChange(e, 'title')}
                  className="mb-2 sm:mb-0 mr-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 max-w-28"
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
                <div className="flex items-center w-1/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="input-image"
                  />
                  <label htmlFor="input-image" className="cursor-pointer mr-2">Escolher</label>
                  {editedMeeting.imagem && (
                    <img src={editedMeeting.imagem} alt="Imagem da reunião" className="max-w-xs h-12" />
                  )}
                </div>
                <input
                  type="text"
                  value={editedMeeting.emails.join(', ')}
                  onChange={(e) => handleInputChange(e, 'emails')}
                  className="mb-2 sm:mb-0 mr-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-64"
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
                <div className="w-1/5">{meeting.title}</div>
                <div className="w-1/5">{meeting.data}</div>
                <div className="w-1/5">{meeting.hora}</div>
                <div className="w-1/5">
                  <img src={meeting.imagem} alt="Imagem da reunião" width={50} height={50} className="max-w-xs mx-auto mt-2" />
                </div>
                <div className="w-1/5">{Array.isArray(meeting.emails) ? meeting.emails.join(', ') : ''}</div>
                <div className="w-1/5">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 font-bold"
                  >
                    <FaEdit className="inline-block mr-1" />
                  </button>
                </div>
                <div className='w-1/5 justify-center'>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 font-bold"
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
