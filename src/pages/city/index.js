import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class City extends React.Component{
  
  state = {
    list:[],
    isShowOpenCity: false
  }
  
  params = {
    page: 1
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = ()=>{
    let _this = this;
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res)=> {
        this.setState({
          list: res.result.item_list.map((item, index) => {
              item.key = index
              return item
          }),
          pagination: Utils.pagination(res, (current) => {
              _this.params.page = current
              _this.requestList()
          })
         })
    })
  }

  //开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity:true
    })
  }

  handleSubmit = ()=> {
    let cityInfo = this.cityForm.props.form.getFieldsValue();// 取值
    axios.ajax({
      url: '/city/open',
      data: {
        params: cityInfo
      }
    }).then((res)=>{
      if(res.code == '0'){
        message.success('Open Successful');
        this.setState({
          isShowOpenCity: false
        })
        this.requestList();
      }
    })
  }
  render() {
    const columns = [
      {
        title: 'CityID',
        dataIndex: 'id' //字段和表单定义的一致
      },
      {
        title: 'CityName',
        dataIndex: 'name'
      },
      {
        title: 'Using mode',
        dataIndex: 'mode',
        render(mode) {
          return mode == 1 ? 'Parking zone' : 'Forbidden zone';
        }
      },
      {
        title: 'Operation mode',
        dataIndex: 'op_mode',
        render(op_mode) {
          return op_mode == 1 ? 'self-business' : 'Franchisees';
        }
      },
      {
        title: 'Authorized franchisee Name',
        dataIndex: 'franchisee_name'
      },
      {
        title: 'city admins',
        dataIndex: 'city_admins',
        render(arr) {
          return arr.map((item)=> {
            return item.user_name
          }).join(',');
        }
      },
      {
        title: 'Open Time',
        dataIndex: 'open_time'
      },
      {
        title: 'Update Time',
        dataIndex: 'update_time',
        render: Utils.formateDate
      },
      {
        title: 'system username',
        dataIndex: 'sys_user_name'
      }
    ]
    return(
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.handleOpenCity}>open city</Button>
        </Card>
        <div className="content-wrap">
          <Table 
            className="ant-table-wrapper "
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
          <Modal
            title="open city"
            visible={this.state.isShowOpenCity}
            onCancel={()=> {
              this.setState({
                isShowOpenCity: false
              })
            }}
            onOk={this.handleSubmit}
          >
           <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>

          </Modal>
        </div>
      </div>
    );
  }
}

export default City; 

class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="inline">
        <FormItem label="City">
          {
            getFieldDecorator('city_id')(
              <Select
                style={{width: 100}}
                placeholder="Select"
              >
                <Option value="">ALL</Option>
                <Option value="1">Vancouer</Option>
                <Option value="2">Toronto</Option>
                <Option value="3">Montreal</Option>
              </Select> 
            )
          }
        </FormItem>
        <FormItem label="Using mode">
          {
            getFieldDecorator('mode')(
              <Select
              style={{width: 120}}
                placeholder="ALL"
              >
                
                <Option value="">ALL</Option>
                <Option value="1">Designated parking zone mode</Option>
                <Option value="2">Forbidden zone mode</Option>
              </Select> 
            )
          }
        </FormItem>
        <FormItem label="Operation mode">
          {
            getFieldDecorator('op_mode')(
              <Select
              style={{width: 80}}
                placeholder="ALL"
              >
                
                <Option value="">ALL</Option>
                <Option value="1">Self-business</Option>
                <Option value="2">Franchisees</Option>
              </Select> 
            )
          }
        </FormItem>
       
        <FormItem label="Franchise operation status">
          {
            getFieldDecorator('auth_status')(
              <Select
              style={{width: 90}}
                placeholder="ALL"
              >
                
                <Option value="">ALL</Option>
                <Option value="1">Authorized</Option>
                <Option value="2">Unauthorized</Option>
              </Select> 
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}}>Search</Button>
          <Button>Reset</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span:7
      },
      wrapperCol: {
        span:10
      }
    }
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="horizontal" {...formItemLayout}> 
      {/* //解构出来 */}
      
        <FormItem label="City select">
        {
        getFieldDecorator('city_id', {
          initialValue: '1'
        })(
          <Select style={{width: 130}}>
            <Option value="">ALL</Option>
            <Option value="1">Vancouver</Option>
            <Option value="2">Montreal</Option>
          </Select>
        )
      }
        </FormItem>
        <FormItem label="Operation mode" {...formItemLayout}>
        {
        getFieldDecorator('op_mode', {
          initialValue: '1'
        })(
          <Select style={{width: 130}}>
            <Option value="1">Self-business</Option>
            <Option value="2">Franchisees</Option>
          </Select>
        )
      }
          
        </FormItem>
        <FormItem label="Using mode" {...formItemLayout}>
        {
        getFieldDecorator('user_mode', {
          initialValue: '1'
        })(
          <Select style={{width: 130}}>
          <Option value="1">Parking zone</Option>
          <Option value="2">Forbidden zone</Option>
        </Select>
        )
      }
         
        </FormItem>
      </Form>
    );
  }
}
OpenCityForm = Form.create({})(OpenCityForm); //Form.create去创建一个对象
// 包装成antd这样一个form表单

