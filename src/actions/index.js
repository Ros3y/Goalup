export function addStudentToList(student) {
  return {
    type: "ADD_STUDENT",
    payload: student,
  };
}

export function removeStudentFromList(student) {
  return {
    type: "REMOVE_STUDENT",
    payload: student,
  };
}

export function selectAStudent(student) {
  return {
    type: "SELECT_STUDENT",
    payload: student,
  };
}

export function addStudentGoal(goal) {
  return {
    type: "ADD_GOAL",
    payload: goal,
  };
}

export function removeStudentGoal(student, goal) {
  return {
    type: "REMOVE_GOAL",
    payload: { student, goal },
  };
}

export function iterateStudentGoal(student, goal) {
  return {
    type: "ITERATE_GOAL",
    payload: { student, goal },
  };
}

export function iterateStudentGoalsCompleted(student) {
  return {
    type: "ITERATE_COMPLETED_GOALS",
    payload: student,
  };
}

export function selectStudentFocusGoal(goal) {
  return {
    type: "SELECT_FOCUS_GOAL",
    payload: goal,
  };
}
