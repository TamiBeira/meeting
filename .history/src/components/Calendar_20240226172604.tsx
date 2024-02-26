import React, { useState, useEffect } from 'react';
import { Calendar as CalendarBG, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('pt-br');

const localizer = momentLocalizer(moment);

export const Calendar = () => {
  const [view, setView] = useState('week');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem('meetingData');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const handleSelectEvent = (event) => {
    alert(`Detalhes do evento:\nTítulo: ${event.title}\nInício: ${event.start}\nFim: ${event.end}\nLocal: ${event.location}`);
  };

  const tooltipAccessor = (event) => (
    <div>
      <strong>Título:</strong> {event.title}<br />
      <strong>Data:</strong> {event.data}<br />
      <strong>Hora:</strong> {event.hora}<br />
      <strong>Imagem:</strong> {event.imagem}<br />
      <strong>E-mails:</strong> {event.emails.join(', ')}<br />
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="flex space-x-4 mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setView('day')}>Dia</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setView('week')}>Semana</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setView('month')}>Mês</button>
      </div>
      <CalendarBG
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ width: 500, height: 450 }}
        views={['month', 'week', 'day']}
        view={view}
        components={{
          toolbar: () => null
        }}
        onSelectEvent={handleSelectEvent}
        tooltipAccessor={tooltipAccessor}
      />
    </div>
  );
};
