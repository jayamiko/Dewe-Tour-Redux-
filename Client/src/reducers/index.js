// Root Reducer
import {combineReducers} from "redux";

import auth from "./auth";
import trips from "./trips";
import transactions from "./transactions";

export default combineReducers({auth, trips, transactions});
