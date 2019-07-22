import { combineReducers } from 'redux';
import loginReducer from '../page/login/store/reducer'

const reducer = combineReducers({
	login: loginReducer
})

export default reducer;