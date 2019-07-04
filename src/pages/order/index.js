import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class Order extends React.Component {
  state={}

  params = {
    page: 1
  }
  componentDidMount() {
    this.requestList()
  }
  requestList = ()=> {
    let _this = this;
    axios.ajax({
      url: '/order/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res)=> {
      let list = res.result.item_list.map((item, index)=> {
        item.key = index;
        return item;
      });
      this.setState({
        list,
        pagination: Utils.pagination(res, (current)=>{
          _this.params.page = current;
          _this.requestList();
        })
      })
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [index];
  console.log(record)
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }

  openOrderDetail =() =>{
    let item = this.state.selectedItem;
    if (!item) {
        Modal.info({
            title: 'Notic',
            content: 'Please select an order'
        })
        return;
    }
    // window.location.href = `/#/common/order/detail/${item.id}`
    window.open(`/#/common/order/detail/${item.id}`, '_blank')
  }
  
  render() {
    const columns = [
      {
          title:'Order number',
          dataIndex:'order_sn'
      },
      {
          title: 'Bike number',
          dataIndex: 'bike_sn'
      },
      {
          title: 'Username',
          dataIndex: 'user_name'
      },
      {
          title: 'Cellphone number',
          dataIndex: 'mobile'
      },
      {
          title: 'Distence',
          dataIndex: 'distance',
          render(distance){
              return distance/1000 + 'Km';
          }
      },
      {
          title: 'Total time',
          dataIndex: 'total_time'
      },
      {
          title: 'Status',
          dataIndex: 'status',
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
          title: 'Start time',
          dataIndex: 'start_time'
      },
      {
          title: 'End time',
          dataIndex: 'end_time'
      },
      {
          title: 'Rrder amount',
          dataIndex: 'total_fee'
      },
      {
          title: 'The amount actually paid',
          dataIndex: 'user_pay'
      }
  ]
  const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:19}
  }
  const selectedRowKeys = this.state.selectedRowKeys;
  const rowSelection = {
      type: 'radio',
      selectedRowKeys
  }
    return(
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.openOrderDetail}>Order details</Button>
          <Button type="primary" >Finish order</Button>
        </Card>
        <div className="content-wrap">
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        this.onRowClick(record, index);
                    }
                };
            }}
          />
        </div>
      </div>
    );
  }
}
export default Order;

class FilterForm extends React.Component {
  

  render() {
    const { getFieldDecorator } = this.props.form;

    
    return(
      <Form layout="inline">
        <FormItem label="City">
          {
            getFieldDecorator('city_id')(
              <Select
                style={{width: 80}}
                placeholder="Select"
              >
                <Option value="">ALL</Option>
                <Option value="1">Vancouver</Option>
                <Option value="2">Toronto</Option>
                <Option value="3">Montreal</Option>
              </Select> 
            )
          }
        </FormItem>
        <FormItem label="Start time">
          {
            getFieldDecorator('start_time')(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
          
        </FormItem>
        <FormItem label="End time">
        {
            getFieldDecorator('end_time')(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
          
        </FormItem>
       
        <FormItem label="Order status">
          {
            getFieldDecorator('op_mode')(
              <Select
              style={{width: 80}}
                placeholder="ALL"
              >               
                <Option value="">ALL</Option>
                <Option value="1">processing</Option>
                <Option value="2">End of order</Option>
              </Select> 
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{margin: '0 10px'}}>Search</Button>
          <Button>Reset</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);