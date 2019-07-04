import React from 'react';
import { Card, Form, Input, Button, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, InputNumber, Upload, Icon, message } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
 
class FormRegister extends React.Component {
  state={}

  handleSubmit = ()=> {
    let userInfo = this.props.form.getFieldsValue();
    //getFieldsValue 获取表单里面的值
    console.log(JSON.stringify(userInfo))
    message.success(`${userInfo.userName} Congratulations, your registration is successful, the current password is ${userInfo.userPwd}`)
  }

  getBase64 = (img, callback)=> {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        userImg: imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;  
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
        // 左边占4份
      },
      wrapperCol: {
        xs: 24,
        sm: 12
        // 右边占12份
      }
    }
    const offsetLayout = {
      wrapperCol:{
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
        // 指定右侧 偏移4份 因为原来如果由左侧的话是4份
      }
    }

    const rowObject = {
      minRows:4, maxRows: 6
    }
    return(
      <div>
        <Card title="Register from">
          <Form layout="horizontal">
            <FormItem label="username" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'Username can not be empty'
                    }
                  ]
                })(
                  <Input placeholder="password" />
                )
              }
            </FormItem>
           
            <FormItem label="password" {...formItemLayout}>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'password can not be empty'
                    }
                  ]
                })(
                  <Input type="password" placeholder="password" />
                )
              }
            </FormItem>
            <FormItem label="gender" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1'                 
                })(
                  <RadioGroup>
                    <Radio value="1">Male</Radio>
                    <Radio value="2">Female</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="age" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: '18'                 
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label="state" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '2'                 
                })(
                  <Select>
                    <Option value="1">student</Option>
                    <Option value="2">worker</Option>
                    <Option value="3">teacher</Option>
                    <Option value="4">CEO</Option>
                    <Option value="5">artist</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="hobby" {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: ['2', '5']        
                })(
                  <Select mode="multiple">
                    <Option value="1">swiming</Option>
                    <Option value="2">basketball</Option>
                    <Option value="3">football</Option>
                    <Option value="4">running</Option>
                    <Option value="5">hiking</Option>
                    <Option value="6">ride</Option>
                    <Option value="7">tennis</Option>
                    <Option value="8">sing</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="marriage" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: true  
                })(
                  <Switch />
                )
              }
            </FormItem>
            <FormItem label="birthday" {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2018-08-08')
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                )
              }
            </FormItem>
            <FormItem label="contact address" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: 'vancouver, BC'
                })(
                  <TextArea 
                    autosize={
                      rowObject //autosize是一个对象 设定最小行数和最大行数
                    }
                  />
                )
              }
            </FormItem>
            <FormItem label="Wakeup TIme" {...formItemLayout}>
              {
                getFieldDecorator('time')(
                  <TimePicker />
                )
              }
            </FormItem>
            <FormItem label="Avatar" {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    onChange={this.handleChange}

                  >
                    {
                      this.state.userImg ? <img src={this.state.userImg} style={{width:100}}/>:<Icon type="plus" />
                    }
                  </Upload>
                )
              }
            </FormItem>
            <FormItem  {...offsetLayout}>
              {
                getFieldDecorator('lease', {
                  valuePropName: 'checked',
                  initialValue: true  
                })(
                 <Checkbox>I already read <a href="#">protocol</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem  {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>signup</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(FormRegister);