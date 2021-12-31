// Root Reducer
import {combineReducers} from "redux";

import users from "./users";
import auth from "./auth";
import trips from "./trips";
import transactions from "./transactions";

export default combineReducers({auth, users, trips, transactions});
