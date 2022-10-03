import React from "react";
import { addStudentGoal } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CreateGoal from "./CreateGoal";

function AddGoal() {
  const [goalCreationisOpen, setGoalCreationisOpen] = useState(false);
  const dispatch = useDispatch();

  function openGoalCreationScreen() {
    setGoalCreationisOpen(true);
  }

  function closeGoalCreationScreen() {
    setGoalCreationisOpen(false);
  }

  function handleCreate(goal) {
    dispatch(addStudentGoal(goal));
    closeGoalCreationScreen();
  }

  function handleCancel() {
    closeGoalCreationScreen();
  }

  return (
    <div>
      {!goalCreationisOpen && (
        <button
          className="student-list__student-buttons-create-goal"
          onClick={openGoalCreationScreen}
        >
          Create Goal
        </button>
      )}

      {goalCreationisOpen && (
        <CreateGoal onCancel={handleCancel} onCreate={handleCreate} />
      )}
    </div>
  );
}

export default AddGoal;
