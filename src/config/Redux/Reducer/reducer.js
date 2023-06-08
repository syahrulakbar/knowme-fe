import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import experienceReducer from "./experienceReducer";
const reducer = combineReducers({ globalReducer, experienceReducer });
export default reducer;
