import React,{ Component } from 'react';
import axios from '../../../axios/index';
import { Form } from 'antd';


class ProductDatail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			data: {}
		}
	}
	componentDidMount() {
		this.loadProduct();
	}
	loadProduct() {
		if(this.state.id) {
			axios.ajax({
				url: '/product/detil'
			}).then((res)=>{
				if(res.status === 0){
					this.setState({
						data: res.data
					})
				}
			})
		}
	}
	render() {
		const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 14 },
		};
		return (
			<Form {...formItemLayout}>
				<Form.Item label="商品名称" {...formItemLayout}>
					{this.state.data.name}
				</Form.Item>
				<Form.Item label="商品描述" {...formItemLayout}>
					{this.state.data.subtitle}
				</Form.Item>
				<Form.Item label="商品价格">
				<span className="ant-form-text">{this.state.data.price} 元</span>
				</Form.Item>
				<Form.Item label="商品库存">
				<span className="ant-form-text">{this.state.data.number} 件</span>
				</Form.Item>
				<Form.Item label="上架日期">
				<span className="ant-form-text">{this.state.data.createTime}</span>
				</Form.Item>
      		</Form>
		)
	}
}

const WrappedProductDatail = Form.create()(ProductDatail);

export default WrappedProductDatail;