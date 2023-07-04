
import React, { Fragment, useState, useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar'
import { Spin, Modal, Button, notification } from "antd";
import "../../assets/styles/pages/calendar-page.scss";
import moment from 'moment';
import accountAPI from "../../api/apiService";
import { AiOutlineDelete } from 'react-icons/ai';

function CalendarPage() {

  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  useEffect(() => {
    refreshCalendarInformation();
  }, []);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('Please enter event name');
      if (title) {
        const newEvent = {
          date: moment(start).format("YYYY-MM-DD"), // 2023-06-10
          start: moment(start).format("HH:mm"), // эта строка конвертит JS Date в 21:35
          end: moment(end).format("HH:mm"),
          priority: "Low",
          status: "To do",
          title: title,
        }
        handleAddEvent(newEvent);  // визвала функция
       // handleDeleteEvent(newEvent);

        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  // select event
  const handleSelectEvent = useCallback(
    (event) => {
      console.log(event)
      Modal.confirm({
        title:  'Event Details',
        content: <p>{event.title}</p>,
        okText: 'Close',
        cancelText: <AiOutlineDelete></AiOutlineDelete>,
        closable: true,
        // icon: <AiOutlineDelete></AiOutlineDelete>,
        onCancel: () => handleDeleteEvent(event)
      });
    },
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  // add event
  const handleAddEvent = async (newEvent) => {
    setIsLoading(true);
    try {
      const response = await accountAPI.addTasksEventsAPI(newEvent);
      await refreshCalendarInformation();
      notification.success({
        message: (<b>Task was successfully added!</b>)
      }); 
    } catch (error) {
    }
    setIsLoading(false);
  };

  // delete event
  const handleDeleteEvent = async (eventToDelete) => {
    setIsLoading(true);
    try {
      const response = await accountAPI.deleteTasksEventsAPI(eventToDelete.id);
      await refreshCalendarInformation();
      notification.success({
        message: (<b>{response.message}</b>)
      });
    } catch (error) {
    }
    setIsLoading(false);
  }
    

  const onChangeDate =  async (date) => {
    console.log(date);
    const year = moment(date).format("YYYY");
    const month = moment(date).format("MM"); // январь будет 1
    console.log(month)
    await getCalendarEvents(year, month);
  }

  const getCalendarEvents = async (year, month) => {
    setIsLoading(true);
    try {
      const response = await accountAPI.getCalendarEventsAPI(year, month);
      let arrayOfEvents = [];
      response.forEach(elements => {

        elements.forEach(event => {
          console.log(event)
          // "start": "06:00",
          //   "end": "08:00",
          const startArray = event.start.split(":");
          const endArray = event.end.split(":");

          arrayOfEvents.push({
            id: event._id,
            title: event.title,
          start: new Date(event.createYear, event.createMonth - 1, event.createDay, Number(startArray[0]),  Number(startArray[1]), 0), //10:32
            end: new Date(event.createYear, event.createMonth - 1, event.createDay, Number(endArray[0]), Number(endArray[1]), 0), //12:32
          });
        });
      });
      setEvents(arrayOfEvents);
    } catch (error) {
      console.error('Error when open a calendar', error);
    }
 setIsLoading(false);
  };

  // show modal
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleDelete = async () => {
    setConfirmLoading(true);
    // Здесь выполните логику удаления события
    // ...
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Fragment>

      {isLoading
              ? (
                <div className="example1">
                  <Spin size="large" />
                </div>
              ) : ""}

      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>

      {/* <Modal
        title="Your event"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="delete" danger onClick={handleDelete}>
            Delete
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk} loading={confirmLoading}>
            OK
          </Button>,
        ]}
      
      >
        <p>{modalText}</p>
      </Modal> */}
     

              <div style={{ height: 600 }} className="height600">

              <Calendar
                onNavigate={(data) => onChangeDate(data)}
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

  async function refreshCalendarInformation() {
    const currentDate = new Date(); // январь тут будет 0
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    console.log(month);
    await getCalendarEvents(year, Number(month) + 1);
  }
}

CalendarPage.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}

export default CalendarPage;
