import { combineReducers } from "redux";
import studentsReducer from "./students";


export default combineReducers({
    students: studentsReducer,
});