import React from 'react';
import 'components/Appointment/styles.scss';

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from 'hooks/useVisualMode';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';





export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW)) 
  }

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY)) 
  }
   console.log(props.interview)

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EDIT && <Form interviewer={props.interview.interviewer.id} name={props.interview.student} interviewers={props.interviewers} onSave={(name, interviewer) => save(name, interviewer)} onCancel={() => back()} />}
      {mode === CONFIRM && <Confirm onConfirm={(name, interviewer) => cancel(name, interviewer)} onCancel={() => back()} />}
      {mode === SAVING && <Status />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={(name, interviewer) => save(name, interviewer)} onCancel={() => back()} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer ? props.interview.interviewer.name : null}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
    </article>
  )
};