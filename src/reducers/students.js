const defaultState = {
  students: [],
  selectedStudent: null,
};

export default function studentsReducer(state = defaultState, action) {
  const students = [...state.students];
  const selectedStudentIndex = state.selectedStudent
    ? students.findIndex(
        (student) => state.selectedStudent.name === student.name
      )
    : -1;

  function findStudentIndex(currentStudent) {
    const studentIndex = students.findIndex(
      (student) => currentStudent.name === student.name
    );
    return studentIndex;
  }

  switch (action.type) {
    case "ADD_STUDENT":
      const student = {
        name: action.payload,
        goals: [],
        completedGoals: 0,
        focusGoal: null,
      };
      students.push(student);
      return { ...state, students };

    case "REMOVE_STUDENT":
      const newStudents = students.filter(
        (student) => student.name !== action.payload.name
      );
      return { ...state, students: newStudents };

    case "SELECT_STUDENT":
      return { ...state, selectedStudent: action.payload };

    case "ADD_GOAL":
      students[selectedStudentIndex].goals.push(action.payload);
      if (!students[selectedStudentIndex].focusGoal) {
        students[selectedStudentIndex].focusGoal = action.payload;
      }
      return { ...state, students };

    case "REMOVE_GOAL":
      const studentID = findStudentIndex(action.payload.student);
      students[studentID].goals = students[studentID].goals.filter(
        (goal) => goal.name !== action.payload.goal.name
      );
      if (students[studentID].goals.length > 0) {
        students[studentID].focusGoal = students[studentID].goals[0];
      } else {
        students[studentID].focusGoal = null;
      }
      return { ...state, students };

    case "ITERATE_GOAL":
      const studentIndex = state.students.findIndex(
        (student) => action.payload.student.name === student.name
      );
      const goalIndex = students[studentIndex].goals.findIndex(
        (goal) => action.payload.goal.name === goal.name
      );
      students[studentIndex].goals[goalIndex].count++;
      return { ...state, students };

    case "ITERATE_COMPLETED_GOALS":
      students[findStudentIndex(action.payload)].completedGoals++;
      return { ...state, students };

    case "SELECT_FOCUS_GOAL":
      students[selectedStudentIndex].focusGoal = action.payload;
      return { ...state, students };

    default:
      return state;
  }
}
