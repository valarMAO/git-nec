import React,{ Component } from 'react';
import axios from 'axios';
import {
	Form, Input, InputNumber, Button, Upload, Icon
  } from 'antd';


class ProductSave extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			data: ''
		}
	}
	componentDidMount() {
		this.loadProduct();
	}
	loadProduct() {
		if(this.state.id) {
			axios.get('/api/save.json?id='+this.state.id).then((res)=>{
				let data = res.data;
				console.log(data)
				if(data.success === true){
					this.setState({
						data: data.data
					})
				}
			}).catch((err)=>{
				console.log(err)
			})
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			console.log('Received values of form: ', values);
		  }
		});
	  };
	normFile = e => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
		  return e;
		}
		return e && e.fileList;
	  };
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 14 },
		};
		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<Form.Item label="商品名称" {...formItemLayout}>
					<Input placeholder="请输入商品名称" value={this.state.data.name} />
				</Form.Item>
				<Form.Item label="商品描述" {...formItemLayout}>
					<Input placeholder="请输入商品描述" value={this.state.data.details}/>
				</Form.Item>
				<Form.Item label="商品价格">
				{getFieldDecorator('mon-number', { initialValue: this.state.data.price })(<InputNumber min={0} max={9999999} />)}
				<span className="ant-form-text"> 元</span>
				</Form.Item>
				<Form.Item label="商品库存">
				{getFieldDecorator('input-number', { initialValue: this.state.data.number })(<InputNumber min={0} max={9999999} />)}
				<span className="ant-form-text"> 件</span>
				</Form.Item>

				<Form.Item label="图片上传">
				{getFieldDecorator('upload', {
					valuePropName: 'setFieldsValue',
					getValueFromEvent: this.normFile,
				})(
					<Upload name="logo" action="/upload.do" listType="picture" fileList={this.state.data.image}>
					<Button>
						<Icon type="upload" /> Click to upload
					</Button>
					</Upload>,
				)}
				</Form.Item>
				<Form.Item wrapperCol={{ span: 12, offset: 6 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
				</Form.Item>
      		</Form>
		)
	}
}

const WrappedProductSave = Form.create()(ProductSave);

export default WrappedProductSave;