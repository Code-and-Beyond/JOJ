import { combineReducers } from "redux";
import searchReducer from "./search";
import userReducer from "./user";
import busReducer from "./buses";
import bookingReducer from "./booking";


export const rootReducer = combineReducers({
	user: userReducer,
	srch: searchReducer,
	bus: busReducer,
	book: bookingReducer
});

export type RootState = ReturnType<typeof rootReducer>;