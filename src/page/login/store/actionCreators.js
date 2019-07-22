import axios from 'axios';

const changeLogin = (username) => ({
	type: 'change_login',
	username: username,
	value: true
})

export const login = (username, password) => {
	return (dispatch) => {
		axios.get('/api/login.json?username='+ username + '&password='+ password).then((res)=>{
			const result = res.data.success;
			const username = res.data.data;
			if(result) {
				dispatch(changeLogin(username));
			}else {
				alert('登陆失败')
			}
		})
	}
}

export const logout = () => ({
	type: 'change_logout',
	username: '',
	value: false
})