
import React, { Fragment, useState, useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar'
// import events from "../../helpers/events";
import moment from 'moment';
import accountAPI from "../../api/apiService";

function CalendarPage() {

  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = useState([])

  useEffect(() => {
    console.log('Use effect');
    getCalendarEvents(2023, 6);
    //getAccountInfomation();
  }, []);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('Please enter event name');
      if (title) {       
        const newEvent =  {
          date: moment(start).format("YYYY-MM-DD"), // 2023-06-10
          start: moment(start).format("HH:mm"), // эта строка конвертит JS Date в 21:35
          end: moment(end).format("HH:mm"), 
          priority: "Low",          
          status: "To do",
          title: title,
        }
        handleAddEvent(newEvent);  // визвала функция

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
      defaultDate: new Date(2023, 5, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  const handleAddEvent = async (newEvent) => {
    try {
      const response = await accountAPI.addTasksEventsAPI(newEvent);
    } catch (error) {
      console.error('Error when adding an event', error);
    }
  };

  const onChangeNavigation = (date, action) => {
    console.log(date);
    const year = moment(date).format("YYYY");
    const month = moment(date).format("MM");
    getCalendarEvents(year, month);
  }

  const getCalendarEvents = async (year, month) => {
    try {
      const response = await accountAPI.getCalendarEventsAPI(year, month);

      let arrayOfEvents = [];
      response.forEach(elements => {

        elements.forEach(event => {
          arrayOfEvents.push({
            id: event._id,
            title: event.title,
            start: new Date(event.createYear, event.createMonth - 1, event.createDay, 8, 0, 0), //10:32
            end: new Date(event.createYear, event.createMonth - 1, event.createDay, 10, 30, 0), //12:32
          });
         });       
      });
      setEvents(arrayOfEvents);
      console.log(arrayOfEvents);

      console.log(response);
    } catch (error) {
      console.error('Error when open a calendar', error);
    }
  };

  return (

    <Fragment>
      {/* <button onClick={handleAddEventButtonClick}>Add new event</button> */}
      {/* <button onClick={handleGetCalendarButtonClick}>Get calendar</button> */}
      <div style={{
        height: 600
      }} className="height600"
      >
        <Calendar
          onNavigate={(data, view, action) => onChangeNavigation(data, action)}
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
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
