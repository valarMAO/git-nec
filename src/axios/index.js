import axios from 'axios';
import { message } from 'antd';

export default class Axios {
	static ajax(e){
		let baseApi = 'https://www.easy-mock.com/mock/5d0c2554b5cf5d480be7db8c/nscmock/api';
		return new Promise((resolve,reject)=>{
			axios({
				url: e.url,
				method: 'get',
				baseURL: baseApi,
				timeout: 5000,
				params: (e.data && e.data.params) || ''
			}).then((response)=>{
				if(response.status === 200){
					let res = response.data;
					if(res.status === 0){
						resolve(res)
						console.log(res.data)
					}else{
						message.info(
							res.message, 3
						)
					}
				}else{
					reject(response.data);
				}
			})
		})
	}
}