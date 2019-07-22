import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from './store/actionCreators';
import { Card, Form, Icon, Input, Button } from 'antd';

class Login extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: ''
		}
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			console.log('Received values of form: ', this.state.username, this.state.password);
			this.setState({
				username: values.username,
				password: values.password
			}, ()=>{
				console.log('Received values of form: ', this.state.username, this.state.password);
				this.props.login(this.state.username, this.state.password)
			})
		  }
		});
	  }
	render() {
		const { getFieldDecorator } = this.props.form;
		if(!this.props.loginStatus) {
			return (
				<div style={{ background: '#ECECEC', paddingTop: '140px', height: '100vh' }}>
					<Card title="欢迎登陆" bordered={false} style={{ width: 300, margin: '0 auto' }}>
						<Form onSubmit={this.handleSubmit} className="login-form">
							<Form.Item>
								{getFieldDecorator('username', {
								rules: [{ required: true, message: 'Please input your username!' }],
							})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
							)}
							</Form.Item>
							<Form.Item>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please input your Password!' }],
							})(
								<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
							)}
							</Form.Item>
							<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Log in
							</Button>
							</Form.Item>
						</Form>
					</Card>
				 </div>
			)
		}else {
			return <Redirect to='/admin' />
		}
		
	}
}

const WrappedNormalLoginForm = Form.create()(Login);

const mapState = (state) => ({
	loginStatus: state.login.get('login')
})

const mapDispatch = (dispatch) => ({
	login(username,password) {
		dispatch(actionCreators.login(username,password))
	}
})

export default connect(mapState,mapDispatch)(WrappedNormalLoginForm);