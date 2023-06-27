// import React, { Fragment, useState, useCallback, useMemo } from 'react'
// import PropTypes from 'prop-types'
// import { Calendar, Views, DateLocalizer, momentLocalizer  } from 'react-big-calendar'
// // import DemoLink from '../../DemoLink.component'
// import events from "../../helpers/events";
// import moment from 'moment';

// function CalendarPage() {
 
//   const localizer = momentLocalizer(moment);
//   return (
//   <div>
//     <Calendar
//       localizer={localizer}
//       events={events}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500 }}
//     />
//   </div>
//   )
// }

// // Selectable.propTypes = {
// //   localizer: PropTypes.instanceOf(DateLocalizer),
// // }

// export default CalendarPage;


import React, { Fragment, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar'
// import DemoLink from '../../DemoLink.component'
import events from "../../helpers/events";
import moment from 'moment';

function CalendarPage() {

  const localizer = momentLocalizer(moment);


  const [myEvents, setEvents] = useState(events)

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2023, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  return (
    <Fragment>
      {/* <DemoLink fileName="selectable">
        <strong>
          Click an event to see more info, or drag the mouse over the calendar
          to select a date/time range.
        </strong>
      </DemoLink> */}
      <div   style={{
                height: 600
              }} className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
        />
      </div>
    </Fragment>
  )
}

CalendarPage.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}

export default CalendarPage;
