import React from "react";
import DayList from 'components/DayList';


import "components/Application.scss";
import Appointment from 'components/Appointment/index';
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "helpers/selectors";
import useApplicationData from 'hooks/useApplicationData';


export default function Application(props) {

    const {state, setDay, bookInterview, cancelInterview} = useApplicationData();

    // Retrieves all appointments for a day
    const appointments = getAppointmentsForDay(state, state.day);
    // Retrieves list of interviewers when user wants to create a new appointment
    const interviewers = getInterviewersForDay(state, state.day);


    const schedule = appointments.map(appointment => {
        const interview = getInterview(state, appointment.interview);
        return (<Appointment id={
                appointment.id
            }
            key={
                appointment.id
            }
            interview={interview}
            interviewers={interviewers}
            time={
                appointment.time
            }
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}/>)
    });

    return (<main className="layout">
        <section className="sidebar">

            <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
            <hr className="sidebar__separator sidebar--centered"/>
            <nav className="sidebar__menu">
                <DayList day={
                        state.day
                    }
                    days={
                        state.days
                    }
                    setDay={setDay}/>
            </nav>
            <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
        </section>
        <section className="schedule"> {schedule}
            <Appointment key="last" time='5pm'/>
        </section>
    </main>);
}
