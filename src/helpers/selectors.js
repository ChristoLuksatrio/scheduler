// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: [1]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [1, 2]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };

export function getInterviewersForDay(state, day) {
  const appDay = state.days.filter(data => data.name === day);
    if (!appDay.length) {
      return [];
    } else {
      const idArray = appDay[0].interviewers;
      const intArray = idArray.map(id => state.interviewers[id])
      return intArray;
      }

    }


 export function getAppointmentsForDay(state, day) {

      const appDay = state.days.filter(data => data.name === day);
      if (!appDay.length) {
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
  if (!interview) {
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
