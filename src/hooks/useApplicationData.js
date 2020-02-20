import { useReducer } from 'react';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { /* insert logic */ }
    case SET_APPLICATION_DATA:
      return { /* insert logic */ }
    case SET_INTERVIEW: {
      return /* insert logic */
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

//Contains all the logic used to manage state
export default function useApplicationData() {
  const [state, dispatch] = useReducer({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({...state, day});

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() =>
        setState({
          ...state,
          appointments
        })
      )
  }
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() =>
        setState({
          ...state,
          appointments
        })
      )
  };

  return { setDay, cancelInterview, bookInterview }

}