import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import experienceReducer from "./experienceReducer";
import skillReducer from "./skillReducer";
import certificateReducer from "./certificateReducer";
import projectReducer from "./projectReducer";
const reducer = combineReducers({ globalReducer, experienceReducer, skillReducer, certificateReducer, projectReducer });
export default reducer;
