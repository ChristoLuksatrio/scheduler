import { useReducer, useEffect } from 'react';
import axios from 'axios';


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
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      const { id, interview } = action


      return {
        ...state,
        appointments,
        days: state.days.map(day => {
          let spotCheck = 0;

          if (day.name === state.day) {
            if (interview && state.appointments[id].interview) {
              spotCheck = 0;
            } else if (interview) {
              spotCheck = -1;
            } else {
              spotCheck = 1;
            }
          }

          return {
            ...day,
            spots: day.spots + spotCheck
          }

        })
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

  function renderPage() {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }

  useEffect(() => {
    renderPage()
  }, [])

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