import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAStudent } from "../actions";
import { iterateStudentGoal } from "../actions";
import { removeStudentGoal } from "../actions";
import { iterateStudentGoalsCompleted } from "../actions";
import { selectStudentFocusGoal } from "../actions";

function GoalList() {
  const goals = useSelector((state) => state.students.selectedStudent.goals);
  const selectedStudent = useSelector(
    (state) => state.students.selectedStudent
  );

  const dispatch = useDispatch();
  function iterateGoal(student, goal) {
    if (goal.count === goal.amount - 1) {
      dispatch(removeStudentGoal(student, goal));
      dispatch(iterateStudentGoalsCompleted(student));
    } else if (goal.count < goal.amount) {
      dispatch(iterateStudentGoal(student, goal));
    }
  }

  function manualyRemoveGoal(goal) {
    dispatch(removeStudentGoal(goal));
  }

  function selectFocusGoal(goal) {
    dispatch(selectStudentFocusGoal(goal));
  }

  return goals.map((goal) => {
    return (
      <div className="goal-list" key={goal.name}>
        <div className="goal-list__goal">
          <div className="goal-list__goal-goal-info">
            <div className="goal-list__goal-info-name">{goal.name}</div>
            <div className="goal-list__goal-info-progress-bar">
              <div className="goal-list__goal-info-progress-bar-empty"></div>
              <div
                className="goal-list__goal-info-progress-bar-fill"
                style={{
                  width: (goal.count / goal.amount) * 100 + "%",
                  height: "100%",
                }}
              ></div>
            </div>
            {goal.count}/{goal.amount}
          </div>
          <div className="goal-list__goal-icons">
            {selectedStudent.focusGoal.name !== goal.name ? (
              <button
                className="goal-list__button"
                onClick={() => selectFocusGoal(goal)}
              >
                <span className="material-symbols-outlined">visibility</span>
              </button>
            ) : (
              <button className="goal-list__button-selected">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            )}
            <button
              className="goal-list__button-increase"
              onClick={() => iterateGoal(selectedStudent, goal)}
            >
              <span className="material-symbols-outlined">add_box</span>
            </button>
            <button
              className="goal-list__button-remove"
              onClick={() => manualyRemoveGoal(goal)}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
    );
  });
}

export default GoalList;
