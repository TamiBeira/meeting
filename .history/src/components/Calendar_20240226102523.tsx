import { Calendar as CalendarBG, globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize'

const localizer = globalizeLocalizer(globalize)



export const Calendar = () =>{
  return(
    <main>
      <div>
        <CalendarBG
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </main>
  )
}