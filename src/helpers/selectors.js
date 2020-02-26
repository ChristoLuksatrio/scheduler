export function getInterviewersForDay(state, day) {
    const appDay = state.days.filter(data => data.name === day);
    if (! appDay.length) {
        return [];
    } else {
        const idArray = appDay[0].interviewers;
        const intArray = idArray.map(id => state.interviewers[id])
        return intArray;
    }

}


export function getAppointmentsForDay(state, day) {

    const appDay = state.days.filter(data => data.name === day);
    if (! appDay.length) {
        return [];
    } else {
        const appIds = appDay[0].appointments;
        const allApp = state.appointments;
        const appArray = [];

        for (const app in allApp) {
            if (appIds.includes(allApp[app].id)) {
                appArray.push(allApp[app])
            }
        }

        return appArray;
    }

}


export function getInterview(state, interview) {
    if (! interview) {
        return null;
    }

    const obj = state.interviewers
    const intId = interview.interviewer
    const result = {}

    result['student'] = interview.student;

    for (const i in obj) {
        if (obj[i].id === intId) {
            result['interviewer'] = obj[i];
        }
    }

    return result;
}
