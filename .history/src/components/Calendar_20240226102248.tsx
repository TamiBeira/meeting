import { useState } from 'react';
import { Calendar as CalendarBG, globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize'

const localizer = globalizeLocalizer(globalize)

const myEventsList = [
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

export const Calendar = (props) => (
  const [view, setView] = useState('week');

  <div className="flex flex-col items-center justify-center mt-8">
  <div className="flex space-x-4 mb-4">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setView('day')}>Dia</button>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setView('week')}>Semana</button>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setView('month')}>Mês</button>
  </div>

  <div>
    <CalendarBG
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ width: 500, height: 450 }}
      views={['month', 'week', 'day']}
    />
  </div>
)