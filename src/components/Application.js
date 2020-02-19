import React, { useState, useEffect } from "react";
import DayList from 'components/DayList';


import "components/Application.scss";
import Appointment from 'components/Appointment/index';
import { getAppointmentsForDay } from "helpers/selectors";
 

const axios = require('axios');

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })



  // We only need one active day at a time so we don't need to do the callback
  const setDay = day => setState({...state, day});


  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, [])


  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    // const interview = getInterview(state, appointment.interview);
    return (
      <Appointment key={appointment.id} {...appointment}  />
    )
  });

console.log(state.day)
  return (
    <main className="layout">
      <section className="sidebar">
        
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            day={state.day}
            days={state.days}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        
        {schedule}
      </section>
    </main>
  );
}
