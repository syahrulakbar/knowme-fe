import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import experienceReducer from "./experienceReducer";
import skillReducer from "./skillReducer";
import certificateReducer from "./certificateReducer";
const reducer = combineReducers({ globalReducer, experienceReducer, skillReducer, certificateReducer });
export default reducer;
