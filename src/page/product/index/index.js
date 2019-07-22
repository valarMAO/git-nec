import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios/index';
import { Table, Divider, Tag, Select, Input, Button } from 'antd';

const { Option } = Select;
const Search = Input.Search;

class ProductList extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			searchType: 1
		}
		this.columns=[{
			title: '商品ID',
			dataIndex: 'key'
		},{
			title: '商品名称',
			dataIndex: 'name'
		},{
			title: '价格',
			dataIndex: 'price'
		},{
			title: '商品详情',
			dataIndex: 'subtitle'
		},{
			title: '状态',
			dataIndex: 'status',
			render: text => (
					<span>
						<Tag color="blue" key={text}>
						{text===1?'在售':'下架'}
						</Tag>
					</span>
				)
		},{
			title: '操作',
			dataIndex: 'action',
			render: (text, record) => (
				<span>
				<Link to={`/admin/product/detail/${record.key}`}>详情</Link>
				<Divider type="vertical" />
				<Link to={`/admin/product/save/${record.key}`}>编辑</Link>
				</span>
			)
		}]
	}
	
	componentDidMount() {
    this.request();
  }

  request = ()=>{
    axios.ajax({
      url: '/product/list'
    }).then((res)=>{
      if(res.status == 0){
        this.setState({
          data:res.data.list
        })
      }
    })
  }
	//查找方式
	handleChange(value) {
		console.log(`selected ${value}`);
		this.setState({
			searchType: value
		})
	  }
	onSearchDate(e) {
		console.log(this.state.searchType,e)
		if(e){
			axios.ajax({
				url: '/product/search'
			}).then((res)=>{
				if(res.status == 0){
					this.setState({
						data:res.data
					})
				}
			})
		}else{
			this.request();
		}
	}
	render() {
		return (
			<div>
				<div>
					<Select defaultValue="1" style={{ width: 200, marginRight: 10 }} onChange={this.handleChange.bind(this)}>
						<Option value="1">按商品id搜索</Option>
						<Option value="2">按商品名称搜索</Option>
					</Select>
					<Search
					placeholder="关键词"
					enterButton="搜索"
					style={{ width: 280 }}
					onSearch={value => this.onSearchDate(value)}
					/>
					<Button type="primary" style={{ float: 'right' }}><Link to='/admin/product/save'>添加商品</Link></Button>
				</div>
				<Table columns={this.columns} dataSource={this.state.data}/>
			</div>
		)
	}
}

export default ProductList;