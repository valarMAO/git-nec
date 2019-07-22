import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios/index';
import { Table, Input, Button, Divider } from 'antd';


class categoryList extends Component {
  componentDidMount() {
    this.request();
  }

  request = ()=>{
    axios.ajax({
      url: '/categoryList'
    }).then((res)=>{
      if(res.status == 0){
        this.setState({
          data:res.data
        })
      }
    })
  }
  textChange(e, record) {
    let rows = [...this.state.data];
    let row = rows.find(item => item.key === record.key);
    if (row) {
      row.categoryfirst = e.target.value;
    }
    console.log('rows', rows);
    this.setState({
      data: rows
    })
  }
  okToDisplay(record) {
    let cacheData = [...this.state.editCacheData];
    let index = cacheData.findIndex((e, i, a)=>e.key === record.key);
    cacheData.splice(index, 1);
    this.setState({
        editCacheData: cacheData
    });
}
cancelToDisplay(record) {

  let tableData = [...this.state.data];
  let cacheData = [...this.state.editCacheData];

  let row = tableData.find(item=>item.key === record.key);
  if (row) {
      let editRow = cacheData.find(item=>item.key === record.key);
      if (editRow) {
          row.key = editRow.key;
          row.property = editRow.property;
          row.categoryfirst = editRow.displayName;
      }
  }
}
changeToEdit(record) {
  let cacheData = [...this.state.editCacheData];
  cacheData.push({
      key: record.key,
      property: record.property,
      displayName: record.categoryfirst
  })
  this.setState({
      editCacheData: cacheData
  });
}

constructor(props) {
  super(props);

  //全部数据
  this.state = {
    data: [],
    //正在编辑数据的缓存以便取消动作
    editCacheData: []
  }


  this.columns = [{
    title: '品类ID',
    dataIndex: 'key',
  }, {
    title: '品类名称',
    dataIndex: 'categoryfirst',
    width: 688,
    render: (text, record) => {
      if (this.state.editCacheData.find(item => item.key === record.key)) {
        //编辑状态
        return <Input value={text} style={{ width: 250 }} onChange={(e) => { this.textChange(e, record) }} />
      }
      return text
    }
  },{
    title: '操作',
    key: 'action',
    width: 203,
    render: (text, record) => {

      if (this.state.editCacheData.find(item => item.key === record.key)) {
        //编辑状态
        return <span>
          <a onClick={() => { this.okToDisplay(record) }}>确定</a>
          <Divider type="vertical" />
          <a onClick={() => { this.cancelToDisplay(record) }}>取消</a>
        </span>
      }
      //普通状态
      return <span>
        <a onClick={() => { this.changeToEdit(record) }}>修改名称</a>
      </span>
    }
  }];


}

render(){
  return (
    <div>
      <Button type="primary"><Link to='/admin/product-category/add'>添加品类</Link></Button>
      <Table columns={this.columns} dataSource={this.state.data} pagination={false} />
    </div>
  )
}
}

export default categoryList;