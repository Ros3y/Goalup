import React from "react";
import { addStudentToList } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function AddStudent() {
  const [studentName, setStudentName] = useState("");
  const students = useSelector((state) => state.students.students);

  function SubmitStudent() {
    if (
      studentName &&
      !students.some((student) => studentName === student.name)
    ) {
      dispatch(addStudentToList(studentName));
      setStudentName("");
    }
  }

  const dispatch = useDispatch();
  return (
    <div className="add-student">
      <button onClick={SubmitStudent}>
        <span className="material-symbols-outlined">add_circle</span>
      </button>
      <input
        placeholder="Add Student"
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
    </div>
  );
}

export default AddStudent;
