import React from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd';
const FormItem = Form.Item
 
class FormLogin extends React.Component {
  handleSubmit=()=> {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values)=>{
      if(!err) {
        message.success(`${userInfo.userName} Congratulations, your login is successful, the current password is ${userInfo.userPwd}`)
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;  
    return(
      <div>
        <Card title="Inline Form">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="username"/>
            </FormItem>
            <FormItem>
              <Input placeholder="password"/>
            </FormItem>
            <FormItem>
              <Button type="primary">login</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="Horizontal form" style={{marginTop: 10}}>
          <Form style={{width:300}}>
          <FormItem>
            {
              getFieldDecorator('userName', {
                // initialValue: 'Jack',
                rules: [
                  {
                    required: true,
                    message:'Username can not be empty'
                  },
                  {
                    min:5,
                    max:10,
                    message:'Length is out of range'
                  },
                  {
                    pattern: new RegExp('^\\w+$', 'g'),
                    message:'Username must be a letter or number'
                  },
                ]
              })(
                <Input prefix={<Icon type="user"/>} placeholder="username" />
              )
            }
             
            </FormItem>
            <FormItem>
            {
              getFieldDecorator('userPwd', {
                // initialValue: '123456',
                rules: [
                  {
                    required: true,
                    message:'password can not be empty'
                  }
                ]
              })(
                <Input prefix={<Icon type="lock"/>}placeholder="password" />
              )
            }
            </FormItem>
            <FormItem >
            {
              getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>Remember password</Checkbox>
              )
            }
            <a href="#" style={{float:'right'}}>Forget password</a>
            </FormItem>
            <FormItem >
              <Button type="primary" onClick={this.handleSubmit}>Login</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(FormLogin);
