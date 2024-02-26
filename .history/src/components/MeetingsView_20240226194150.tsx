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
    <div>
      <h2>Lista de Reuniões</h2>
      <ul>
        {meetings.map((meeting, index) => (
          <li key={index}>
            <strong>Título:</strong> {meeting.title}<br />
            <strong>Data:</strong> {meeting.data}<br />
            <strong>Hora:</strong> {meeting.hora}<br />
            <strong>Imagem:</strong> {meeting.imagem}<br />
            <strong>E-mails:</strong> {meeting.emails.join(', ')}<br />
            <button onClick={() => handleEdit(index)}>Editar</button>
            <button onClick={() => handleDelete(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
