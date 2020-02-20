import { useReducer, useEffect } from 'react';
const axios = require('axios');


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value
       }
    case SET_APPLICATION_DATA:
      return { 
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
       }
    case SET_INTERVIEW: {
      console.log('state is', state);


      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      console.log('appointments is', appointments)

      return {
        ...state,
        appointments
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

//Contains all the logic used to manage state
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, [])

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, [bookInterview])

  const setDay = day => dispatch({type: SET_DAY, value: day});

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };


    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() =>
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null
        })
      )
  }
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() =>
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview
        })
      )
  };

  return { state, setDay, cancelInterview, bookInterview }

}