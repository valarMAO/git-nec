import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios/index';
import { Table, Select, Input } from 'antd';

const { Column } = Table;
const { Option } = Select;
const Search = Input.Search;

class OrderList extends Component{
	constructor(props){
        super(props);
        this.state = {
            data: []
        };
  }
  componentDidMount() {
    this.request();
  }

  request = ()=>{
    axios.ajax({
      url: '/orderlist'
    }).then((res)=>{
      if(res.status == 0){
        this.setState({
          data:res.data
        })
      }
    })
  }

  onSearchDate = (e)=>{
    if(e){
      axios.ajax({
        url: '/order/search'
      }).then((res)=>{
        if(res.status == 0){
          this.setState({
            data:res.data
          })
        }else{
          this.request();
        }
      })
    }
  }

	render(){
		return(
			<div>
        <div>
          <Select defaultValue="1" style={{ width: 200, marginRight: 10 }} onChange={this.handleChange}>
              <Option value="1">按商品id搜索</Option>
            </Select>
            <Search
            placeholder="关键词"
            enterButton="搜索"
            style={{ width: 280 }}
            onSearch={value => this.onSearchDate(value)}
            />
        </div>
          <Table dataSource={this.state.data}>
            <Column title="订单号" dataIndex="key"/>
            <Column title="收件人" dataIndex="receiverName"/>
            <Column
              title="订单状态"
              dataIndex="statusDesc"
              render={(text)=>text==1?'已发货':'未发货'}
            />
            <Column title="订单总价" dataIndex="payment"/>
            <Column title="订单时间" dataIndex="createTime"/>
            <Column
              title="操作"
              key="action"
              render={(text, record) => (
                <span>
                <Link to={`/admin/order/detail/${record.key}`}>详情</Link>
                </span>
              )}
            />
          </Table>
        </div>
		)
	}
}

export default OrderList;