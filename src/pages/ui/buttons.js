import React from 'react';
import { Card, Button, Radio } from 'antd';
import './ui.less';
 
class Buttons extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state={
  //     flag: true
  //   }
  // }
  state={
    loading: true,
    size: 'default'
  }
  handleCloseLoading() {
    this.setState({
      loading: !this.state.loading
    })
  }
  handleChange(e) {
    this.setState({
      size: e.target.value
    })
  }
  render() {
    return(
      <div>
        <Card title="Basic button" className="card-wrap">
          <Button type="primary">Imooc</Button>
          <Button>Imooc</Button>
          <Button type="dashed">Imooc</Button>
          <Button type="danger">Imooc</Button>
          <Button disabled>Imooc</Button>
        </Card>
        <Card title="Graphical button" className="card-wrap">
        <Button icon="plus">Create</Button>
          <Button icon="edit">Edit</Button>
          <Button icon="delete">Delete</Button>
          <Button icon="search" shape="circle"></Button>
          <Button type="primary" icon="search">Search</Button>
          <Button type="primary" icon="download">Download</Button>
        </Card>
        <Card title="loading按钮" className="card-wrap">
          <Button type="primary" loading={this.state.loading}>OK</Button>
          <Button type="primary" shape="circle" loading={this.state.loading}></Button>
          <Button loading={this.state.loading}>Loading</Button>
          <Button shape="circle" loading={this.state.loading}></Button>
          <Button type="primary" onClick={()=>this.handleCloseLoading()}>Close</Button>
        </Card>
        <Card title="Button Group" style={{marginBottom:10}}>
          <Button.Group>
            <Button type="primary" icon="left">Back</Button>
            <Button type="primary" icon="right">Forward</Button>
          </Button.Group>
        </Card>
        <Card title="Button Size" className="card-wrap">
          <Radio.Group value={this.state.size} onChange={ (e)=>this.handleChange(e)}>
            <Radio value="small">Small</Radio>
            <Radio value="default">Middle</Radio>
            <Radio value="large">Big</Radio>
          </Radio.Group>         
          <Button type="primary" size={this.state.size}>CMS</Button>
          <Button size={this.state.size}>CMS</Button>
          <Button type="dashed"  size={this.state.size}>CMS</Button>
          <Button type="danger"  size={this.state.size}>CMS</Button>
        </Card>
      </div>
    );
  }
}
export default Buttons;