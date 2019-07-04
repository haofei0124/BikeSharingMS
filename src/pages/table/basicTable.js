import React from 'react';
import { Card, Table, Modal, message, Button } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils'

class BasicTable extends React.Component {
  state={
    dataSource:[]
  }

  params ={
    page: 1
  }
  componentDidMount() {
    const data = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        brithday: '2000-01-01',
        address: 'Vancouver, BC',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        brithday: '2000-01-01',
        address: 'Vancouver, BC',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'Lily',
        sex: '1',
        state: '1',
        interest: '1',
        brithday: '2000-01-01',
        address: 'Montreal, QC',
        time: '09:00'
      },
    ]
    data.map((item, index)=> {
      item.key = index;
    })
    this.setState({
      dataSource: data
    })
    this.request();
  }

  // 动态获取mock数据
  // request = ()=> {
  //   let baseUrl = 'https://www.easy-mock.com/mock/5b012c1fe6e1035843cd3aff/mockapi'
  //   axios.get(baseUrl + '/table/list').then((res)=> {
  //     if(res.status =='200' && res.data.code == 0) {
  //       this.setState({
  //         dataSource2: res.data.result.list
  //       })
  //     }
    
      // console.log(JSON.stringify(res))
  //   })
  // }
  request = ()=> {
    let _this = this;
      axios.ajax({
        url:'/table/list',
        data: {
          params:{
            page: this.params.page
          }
        }
      }).then((res)=> {
        if(res.code == 0) {
          res.result.list.map((item, index)=> {
            item.key = index;
          })
          this.setState({
            dataSource2: res.result.list,
            selectedRowKeys:[],
            selectedRows:null,
            pageination: Utils.pagination(res, (current)=>{
              _this.params.page =current;
              this.request();
            })
          })
        }
    
    })
  }
  onRowClick = (record, index)=> {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  // 多选执行删除任务
  handleDelete = ()=> {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map((item)=> {
      ids.push((item.id))
    })
    Modal.confirm({
      title:'Delete Notic',
      content:`Are you sure you want to delete this data? ${ids.join(',')}`,
      onOk:()=> {
        message.success('successfully deleted');
        this.request();
      }
    })
  }

  render() {

    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: 'username',
        dataIndex: 'userName'
      },
      {
        title: 'gender',
        dataIndex: 'sex',
        render(sex) {
          return sex ==1 ? 'Male': 'Female'
        }
      },
      {
        title: 'state',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1':'student',
            '2':'worker',
            '3':'teacher',
            '4':'CEO',
            '5':'artist'
          }
          return config[state]
        }
      },
      {
        title: 'hobby',
        dataIndex: 'interest', //interset不能随便写 必须是结构返回过来的字段
        render(interest) {
          let config = {
            '1':'swiming',
            '2':'basketball',
            '3':'football',
            '4':'running',
            '5':'hiking',
            '6':'ride',
            '7':'tennis',
            '8':'sing'

          }
          return config[interest]
        }
      },
      {
        title: 'birthday',
        dataIndex: 'birthday'
      },
      {
        title: 'address',
        dataIndex: 'address'
      },
      {
        title: 'Wakeup Time',
        dataIndex: 'time'
      },
    ]
    const {selectedRowKeys} = this.state;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }

    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange:(selectedRowKeys, selectedRows)=> {
        // let ids = [];
        // selectedRows.map((item)=>{
        //   ids.push(item.id)
        // })
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }
    return(
      <div>
        <Card title="Basic Table">
          <Table 
          bordered //加边框
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false} //分页符
          />
        </Card>
        <Card title="Dynamic data rendering table-Mock" style={{margin: '10px, 0'}}>
          <Table 
          bordered //加边框
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false} //分页符
          />
        </Card>
        <Card title="Mock-Radio" style={{margin: '10px, 0'}}>
          <Table 
            bordered //加边框
            rowSelection={rowSelection}
            onRow={(record, index)=> {
              return{
                onClick: ()=> {
                    this.onRowClick(record, index);
                  }
              }
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false} //分页符
          />
        </Card>
        <Card title="Mock-Multiple selection" style={{margin: '10px, 0'}}>
        <div style={{marginBottom:10}}>
          <Button onClick={this.handleDelete}>Delete</Button>
        </div>
          <Table 
            bordered //加边框
            rowSelection={rowCheckSelection}
            onRow={(record, index)=> {
              return{
                onClick: ()=> {
                    this.onRowClick(record, index);
                  }
              }
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false} //分页符
          />
        </Card>
        <Card title="Mock-Table pagination" style={{margin: '10px, 0'}}>
          <Table 
            bordered //加边框
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination} //分页符
          />
        </Card>
      </div>
    );
  }
}
export default BasicTable;