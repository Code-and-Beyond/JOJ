import { combineReducers } from 'redux';
import searchReducer from './search';
import userReducer from './user';
import courseReducer from './courses';
import evalReducer from './evaluations';
import loadingReducer from './loading';

export const rootReducer = combineReducers({
    user: userReducer,
    load: loadingReducer,
    srch: searchReducer,
    crs: courseReducer,
    eval: evalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
