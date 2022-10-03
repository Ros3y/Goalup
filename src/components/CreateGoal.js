import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectStudentFocusGoal } from "../actions";

function CreateGoal(props) {
  const [goal, setGoal] = useState({ name: "", amount: 1, count: 0 });
  const goals = useSelector((state) => state.students.selectedStudent.goals);
  const focusGoal = useSelector(
    (state) => state.students.selectedStudent.focusGoal
  );

  const dispatch = useDispatch();

  function handleClick() {
    if (!goals.some((newGoal) => goal.name === newGoal.name)) {
      setGoal({ ...goal, count: 0 });
      props.onCreate(goal);
    }
  }

  const ui = (
    <div className="create-goal-pop-up">
      <div className="create-goal-pop-up__overlay"></div>
      <div className="create-goal-pop-up__modal">
        <div className="create-goal-pop-up__header">
          <div style={{ width: "36px", height: "36px" }} />
          <h2>Create a Goal</h2>
          <button onClick={() => props.onCancel()}>
            <span class="material-symbols-outlined">cancel</span>
          </button>
        </div>
        <br></br>
        <div className="create-goal-pop-up__body">
          <div className="create-goal-pop-up__body-input">
            <label htmlFor="name">Name </label>
            <input
              id="name"
              type="text"
              value={goal.name}
              onChange={(e) => setGoal({ ...goal, name: e.target.value })}
            ></input>
          </div>
          <div className="create-goal-pop-up__body-input">
            <label htmlFor="amount"> Amount </label>
            <input
              id="amount"
              type="number"
              min={1}
              value={goal.amount}
              onChange={(e) => setGoal({ ...goal, amount: e.target.value })}
            ></input>
          </div>
        </div>
        <button
          className="create-goal-pop-up__body-button"
          onClick={handleClick}
        >
          Create
        </button>
      </div>
    </div>
  );

  const container = document.querySelector("body");
  return ReactDOM.createPortal(ui, container);
}

export default CreateGoal;
