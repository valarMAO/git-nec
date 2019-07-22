import { fromJS } from 'immutable';

const defaultState = fromJS({
	login: false,
	username: ''
})

export default (state = defaultState, action) => {
	switch(action.type) {
		case 'change_login':
			return state.merge({
				login: fromJS(action.value),
				username: fromJS(action.username)
			});
		case 'change_logout':
			return state.merge({
				login: fromJS(action.value),
				username: fromJS(action.username)
		});
		default:
			return state;
	}
}