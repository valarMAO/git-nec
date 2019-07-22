import React, { Component } from 'react';
import axios from '../../../axios/index';
import { Form, Select, Input, Button, message } from 'antd';

const { Option } = Select;

class categoryadd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		this.request();
	}
	request = () => {
		axios.ajax({
			url: '/categoryList'
		}).then((res) => {
			if(res.status == 0) {
				this.setState({
					data: res.data
				})
				console.log(this.state.data)
			}
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log('Received values of form: ', values);
				axios.ajax({
					url:'/categoryadd'
				}).then((res)=>{
					if(res.status == 0){
						message.success(res.msg)
						this.props.history.push('/admin/product-category/index');
					}
				})
			}
		});
	};

	handleSelectChange = value => {
		console.log(value);
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
				<Form.Item label="品类名称">
					{getFieldDecorator('gender', {
						rules: [{ required: true, message: 'Please select your gender!' }],
					})(
						<Select
							placeholder="Select a option and change input text above"
							onChange={this.handleSelectChange}
						>
							{
								this.state.data.map((item) => {
									return <Option value={item.key} key={item.key}>{item.categoryfirst}</Option>
								})
							}
						</Select>
					)}
				</Form.Item>
				<Form.Item label="添加品类">
					{getFieldDecorator('note', {
						rules: [{ required: true, message: 'Please input your note!' }],
					})(<Input />)}
				</Form.Item>
				<Form.Item wrapperCol={{ span: 12, offset: 5 }}>
					<Button type="primary" htmlType="submit">
						确定
          			</Button>
				</Form.Item>
			</Form>
		);
	}
}

const category_add = Form.create()(categoryadd);

export default category_add;