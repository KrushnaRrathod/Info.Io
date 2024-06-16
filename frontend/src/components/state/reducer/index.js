import {combineReducers} from 'redux'
import userReducer from "./user.reducer.js"

export const reducer = combineReducers({
    firstName: userReducer,
    lastName: userReducer,
    email: userReducer,
    phoneNumber: userReducer
})