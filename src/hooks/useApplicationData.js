import {useReducer, useEffect} from 'react';
import axios from 'axios';

import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from "reducers/application";

// Contains all the logic used to manage state
export default function useApplicationData() {
    const [state, dispatch] = useReducer(reducer, {
        day: 'Monday',
        days: [],
        appointments: {},
        interviewers: {}
    })

    function renderPage() {
        Promise.all([axios.get('http://localhost:8001/api/days'), axios.get('http://localhost:8001/api/appointments'), axios.get('http://localhost:8001/api/interviewers')]).then((all) => {
            dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
        })
    }

    useEffect(() => {
        renderPage()
    }, [])

    const setDay = day => dispatch({type: SET_DAY, value: day});

    function cancelInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: {...interview}
        };


        return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment).then(() => dispatch({type: SET_INTERVIEW, id, interview: null}))
    }

    function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: {...interview}
        };


        return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(() => dispatch({type: SET_INTERVIEW, id, interview}))
    };

    return {state, setDay, cancelInterview, bookInterview}

}
