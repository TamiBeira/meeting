import React, { useState, useEffect } from 'react';

export const MeetingsView = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetingData');
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  const handleEdit = (index) => {
    // Implemente a lógica para edição do evento com base no índice
    console.log('Editar evento:', meetings[index]);
  };

  const handleDelete = (index) => {
    // Implemente a lógica para exclusão do evento com base no índice
    console.log('Excluir evento:', meetings[index]);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Reuniões</h2>
      <ul>
        {meetings.map((meeting, index) => (
          <li key={index} className="border-b border-gray-200 py-4 flex items-center">
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
              <img src={meeting.imagem} alt="Imagem da reunião" className="max-w-xs mx-auto mt-2" />
            </div>
            <div className="ml-4">
              <strong>E-mails:</strong> {meeting.emails.join(', ')}
            </div>
            <div className="ml-4">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
