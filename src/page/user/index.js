import React,{ Component } from 'react';
import { Table } from 'antd';
import axios from '../../axios/index';

const columns = [
  {
    title: '名称',
    dataIndex: 'username',
    width: '15%'
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    width: '20%'
  },{
    title: '注册时间',
    dataIndex: 'createTime',
    width: '20%',
    render:time=>new Date(time).toLocaleString()
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
];

class User extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.request();
  }

  request = ()=>{
    axios.ajax({
      url: '/user'
    }).then((res)=>{
      if(res.status === 0){
        this.setState({
          data:res.data.list
        })
      }
    })
  }

  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default User;