import React,{ Component } from 'react';
import axios from '../../axios/index';
import { Form } from 'antd';


class OrderDatail extends Component {
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
				url: '/orderdetail'
			}).then((res)=>{
				if(res.status == 0){
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
					{this.state.data.receiverName}
				</Form.Item>
				<Form.Item label="商品描述" {...formItemLayout}>
					{this.state.data.details}
				</Form.Item>
				<Form.Item label="商品价格">
				<span className="ant-form-text">{this.state.data.payment} 元</span>
				</Form.Item>
				<Form.Item label="商品库存">
				<span className="ant-form-text">{this.state.data.number} 件</span>
				</Form.Item>
				<Form.Item label="支付状态">
				<span className="ant-form-text">{this.state.data.statusDesc}</span>
				</Form.Item>
				<Form.Item label="收货地址">
				<span className="ant-form-text">{this.state.data.shippingVo}</span>
				</Form.Item>
      		</Form>
		)
	}
}

const WrappedOrderDatail = Form.create()(OrderDatail);

export default WrappedOrderDatail;