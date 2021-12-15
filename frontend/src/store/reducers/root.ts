import { combineReducers } from 'redux';
import searchReducer from './search';
import userReducer from './user';
import busReducer from './buses';
import bookingReducer from './booking';
import loadingReducer from './loading';

export const rootReducer = combineReducers({
    user: userReducer,
    load: loadingReducer,
    srch: searchReducer,
    bus: busReducer,
    book: bookingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
