"use client"; 
import React, { useState } from 'react';
import { Calendar as CalendarBG, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('pt-br');

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Café da manhã',
    start: new Date(2022, 0, 22, 6, 0), // 22 de janeiro de 2022, 6:00 AM
    end: new Date(2022, 0, 22, 7, 0), // 22 de janeiro de 2022, 7:00 AM
    location: 'Casa'
  },
  {
    title: 'Voo para Paris',
    start: new Date(2022, 0, 22, 7, 0), // 22 de janeiro de 2022, 7:00 AM
    end: new Date(2022, 0, 22, 7, 30), // 22 de janeiro de 2022, 7:30 AM
    location: 'Aeroporto Internacional John F. Kennedy'
  },
  {
    title: 'Passeio',
    start: new Date(2022, 0, 22, 11, 0), // 22 de janeiro de 2022, 11:00 AM
    end: new Date(2022, 0, 22, 12, 0), // 22 de janeiro de 2022, 12:00 PM
    location: 'Torre Eiffel'
  }
];

export const Calendar = () => {
  const [view, setView] = useState('week');

  const handleSelectEvent = (event) => {
    alert(`Detalhes do evento:\nTítulo: ${event.title}\nInício: ${event.start}\nFim: ${event.end}\nLocal: ${event.location}`);
  };

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
      />
    </div>
  );
};
