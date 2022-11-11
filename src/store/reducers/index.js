import {combineReducers} from "redux";
import users from "./users";
import status from "./status";
import messages from "./messages";


export default combineReducers({
    users,
    messages,
    status,
})
