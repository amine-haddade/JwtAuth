import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";
import { GroupReducer } from "./GroupReducer";

const rootReducer=combineReducers({
    userState:UserReducer,
    groupState:GroupReducer
});
export default   rootReducer