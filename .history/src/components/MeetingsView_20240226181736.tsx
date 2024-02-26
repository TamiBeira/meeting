import React, { useState, useEffect } from 'react';

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
  };

  const handleSave = () => {
    // Atualiza a reunião no estado meetings
    const updatedMeetings = [...meetings];
    updatedMeetings[editableIndex] = editedMeeting;
    setMeetings(updatedMeetings);

    // Limpa o estado de edição
    setEditableIndex(null);
    setEditedMeeting({});
  };

  const handleDelete = (index) => {
    // Implemente a lógica para exclusão do evento com base no índice
    console.log('Excluir evento:', meetings[index]);
  };

  const handleInputChange = (event, key) => {
    // Atualiza o valor do campo editado na reunião em edição
    setEditedMeeting({ ...editedMeeting, [key]: event.target.value });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Reuniões</h2>
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
              // Renderiza os dados da reunião se não estiver em modo de edição
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
                  <img src={meeting.imagem} alt="Imagem da reunião" className="max-w-xs mx-auto mt-2" />
                </div>
                <div className="ml-4">
                  <strong>E-mails:</strong> {meeting.emails.join(', ')}
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
