import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { selectAStudent } from "../actions";
import AddGoal from "./AddGoal";
import GoalList from "./GoalList";
import { removeStudentFromList } from "../actions";
import Confirmation from "./Confirmation";
import { iterateStudentGoal } from "../actions";
import { removeStudentGoal } from "../actions";
import { iterateStudentGoalsCompleted } from "../actions";

function StudentList() {
  const students = useSelector((state) => state.students.students);
  const selectedStudent = useSelector(
    (state) => state.students.selectedStudent
  );

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  function selectStudent(student) {
    dispatch(selectAStudent(student));
    setOpenConfirmation(false);
  }

  function removeStudent(student) {
    setOpenConfirmation(true);
  }

  function handleConfirm(student) {
    dispatch(removeStudentFromList(student));
    setOpenConfirmation(false);
  }

  function handleDecline() {
    setOpenConfirmation(false);
  }

  function iterateGoal(student, goal) {
    if (goal.count === goal.amount - 1) {
      dispatch(removeStudentGoal(student, goal));
      dispatch(iterateStudentGoalsCompleted(student));
    } else if (goal.count < goal.amount) {
      dispatch(iterateStudentGoal(student, goal));
    }
  }

  return (
    <div className="student-list">
      {students.map((student) => {
        return (
          <div
            className={`student-list__student student-list__student${
              selectedStudent && selectedStudent.name === student.name
                ? "-expanded"
                : "-collapsed"
            }`}
            key={student.name}
          >
            <div className="student-list__student-header">
              <div className="student-list__student-header-info">
                <div>
                  {student.name}{" "}
                  <span className="material-symbols-outlined student-list__student-icon">
                    workspace_premium
                  </span>{" "}
                  {student.completedGoals}
                </div>
                {selectedStudent && selectedStudent.name === student.name ? (
                  <button
                    className="student-list__expand"
                    onClick={() => selectStudent(null)}
                  >
                    <span className="material-symbols-outlined student-list__expand-icon">
                      expand_less
                    </span>
                  </button>
                ) : (
                  <button
                    className="student-list__expand"
                    onClick={() => selectStudent(student)}
                  >
                    <span className="material-symbols-outlined student-list__expand-icon">
                      expand_more
                    </span>
                  </button>
                )}
              </div>
              <div className="student-list__student-header-focus">
                {student.focusGoal && (
                  <div className="student-list__student-header-focus-container">
                    <div className="student-list__student-header-focus-goal">
                      <div className="student-list__student-header-focus-goal-name">
                        {student.focusGoal.name}
                      </div>
                      <div className="student-list__student-header-focus-goal-progress">
                        <div className="student-list__student-header-focus-goal-progress-bar">
                          <div
                            className="student-list__student-header-focus-goal-progress-bar-fill"
                            style={{
                              width:
                                (student.focusGoal.count /
                                  student.focusGoal.amount) *
                                  100 +
                                "%",
                              height: "100%",
                            }}
                          ></div>
                        </div>
                        {student.focusGoal.count} / {student.focusGoal.amount}
                      </div>
                    </div>
                    <button
                      className="student-list__student-header-focus-goal-button-increase"
                      onClick={() => iterateGoal(student, student.focusGoal)}
                    >
                      <span className="material-symbols-outlined">add_box</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {selectedStudent && selectedStudent.name === student.name && (
              <div className="student-list__student-body">
                <div className="student-list__student-body-goal-list">
                  <GoalList />
                </div>
                <div className="student-list__student-body-buttons">
                  <AddGoal />
                  <button
                    className="student-list__student-body-buttons-remove"
                    onClick={() => removeStudent(student)}
                  >
                    Remove Student
                  </button>
                </div>
                {openConfirmation && (
                  <Confirmation
                    onConfirm={() => handleConfirm(student)}
                    onDecline={handleDecline}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StudentList;
