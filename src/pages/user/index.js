import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Input, DatePicker, Radio } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

class User extends React.Component{
  
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
      url: '/user/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res)=> {
      console.log(res)
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

  
  handleOperate = (type) => {
    if(type == 'create'){
      this.setState({
        type,
        isShowOpenCity:true,
        title: '创建员工'
      })
    }else if(type =='edit') {
      
    }
  }

  handleSubmit = ()=> {
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldsValue();// 取值
    axios.ajax({
      url: '/user/add',
      data: {
        params: data
      }
    }).then((res)=>{
      if(res.code == '0'){
        this.userForm.props.form.resetFields();//重置表单        
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
        title: 'id',
        dataIndex: 'id' //字段和表单定义的一致
      },
      {
        title: 'username',
        dataIndex: 'username'
      },
      {
        title: 'gender',
        dataIndex: 'sex',
        render(mode) {
          return mode == 1 ? 'Male' : 'Female';
        }
      },
      {
        title: 'state',
        dataIndex: 'state',
        render(state){
          let config = {
              '1':'student',
              '2':'teacher',
              '3':'worker',
              '4':'CEO',
              '5':'artist'
          }
          return config[state];
        }
        
      },
      {
        title: 'hobby',
        dataIndex: 'interest',
        render(interest){
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
          return config[interest];
        }
      },
      {
        title: 'birthday',
        dataIndex: 'birthday',
        
      },
      {
        title: 'address',
        dataIndex: 'address'
      },
      {
        title: 'wakeup Time',
        dataIndex: 'time'
      }
    ]
    return(
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
          <Button type="primary" icon="edit" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
          <Button type="primary" icon="database" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
          <Button type="primary" icon="delete" onClick={()=>this.handleOperate('delete')}>删除员工</Button>
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
            title={this.state.title}
            visible={this.state.isShowOpenCity}
            onCancel={()=> {
              this.userForm.props.form.resetFields();//重置表单
              this.setState({
                isShowOpenCity: false
              })
            }}
            onOk={this.handleSubmit}
            width={600}
          >
           <UserForm type={this.state.type} wrappedComponentRef={(inst)=>{this.userForm = inst;}}/>

          </Modal>
        </div>
      </div>
    );
  }
}

export default User; 

class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="inline">
        <FormItem label="用户名">
          {
            getFieldDecorator('user_name')(
              <Input
                placeholder="请输入用户名"
                style={{width:110}}
              ></Input>
            )
          }
        </FormItem>
        <FormItem label="手机号">
          {
            getFieldDecorator('user_mobile')(
              <Input
                placeholder="请输入手机号"
                style={{width:110}}
              ></Input>
            )
          }
        </FormItem>
        <FormItem label="请选择入职日期">
          {
            getFieldDecorator('user_data')(
              <DatePicker 
              placeholder="请选择入职日期"
              showTime 
              format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);

class UserForm extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span:5
      },
      wrapperCol: {
        span:10
      }
    }
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="horizontal" {...formItemLayout}> 
      {/* //解构出来 */}
      
        <FormItem label="username">
        {
        getFieldDecorator('user_name')(
          <Input type="text" placeholder="username" />
        )
      }
        </FormItem>
        <FormItem label="gender" {...formItemLayout}>
        {
        getFieldDecorator('sex')(
          <RadioGroup>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </RadioGroup>
        )
      }
          
        </FormItem>
        <FormItem label="state" {...formItemLayout}>
        {
        getFieldDecorator('state')(
          <Select style={{width: 100}}>
            <Option value={1}>student</Option>
            <Option value={2}>worker</Option>
            <Option value={3}>teacher</Option>
            <Option value={4}>CEO</Option>
            <Option value={5}>artist</Option>
        </Select>
        )
      }         
        </FormItem>
        <FormItem label="birthday" {...formItemLayout}>
        {
        getFieldDecorator('birthday')(
          <DatePicker />
        )
      }         
        </FormItem>
        <FormItem label="address" {...formItemLayout}>
        {
        getFieldDecorator('address')(
          <TextArea rows={3} placeholder='please wirte down your address'/>
        )
      }         
        </FormItem>
      </Form>
    );
  }
}
UserForm = Form.create({})(UserForm); //Form.create去创建一个对象
// 包装成antd这样一个form表单



