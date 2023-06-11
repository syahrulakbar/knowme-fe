import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import experienceReducer from "./experienceReducer";
import skillReducer from "./skillReducer";
const reducer = combineReducers({ globalReducer, experienceReducer, skillReducer });
export default reducer;
