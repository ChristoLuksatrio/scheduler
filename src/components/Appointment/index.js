import React from 'react';
import 'components/Appointment/styles.scss';

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from 'hooks/useVisualMode';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';





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
    .catch(error => transition(ERROR_SAVE, true));
  }

  function destroy(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(DELETING, true);

    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY)) 
    .catch(error => transition(ERROR_DELETE, true));
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === ERROR_SAVE && <Error onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error onClose={() => back()} />}
      {mode === EDIT && <Form interviewer={props.interview.interviewer.id} name={props.interview.student} interviewers={props.interviewers} onSave={(name, interviewer) => save(name, interviewer)} onCancel={() => back()} />}
      {mode === CONFIRM && <Confirm onConfirm={(name, interviewer) => destroy(name, interviewer)} onCancel={() => back()} />}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
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