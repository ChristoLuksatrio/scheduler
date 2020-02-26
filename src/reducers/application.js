export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {

    switch (action.type) {
        case SET_DAY: return {
                ... state,
                day: action.value
            }
        case SET_APPLICATION_DATA: return {
                ... state,
                days: action.days,
                appointments: action.appointments,
                interviewers: action.interviewers
            }
        case SET_INTERVIEW: {
                const appointment = {
                    ... state.appointments[action.id],
                    interview: {
                        ... action.interview
                    }
                };

                const appointments = {
                    ... state.appointments,
                    [action.id]: appointment
                };

                const {id, interview} = action


                return {
                    ... state,
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
            throw new Error(`Tried to reduce with unsupported action type: ${
                action.type
            }`);
    }
}
