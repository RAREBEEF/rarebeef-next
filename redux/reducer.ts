import { combineReducers } from "redux";
import getGuestBook from "./modules/getGuestBook";
import getToken from "./modules/getToken";

const reducer = combineReducers({ getGuestBook, getToken });

export default reducer;
