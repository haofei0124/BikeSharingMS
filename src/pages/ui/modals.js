import React from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less'


class Modals extends React.Component {
  state={
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  }

  handleOpen(type) {
    this.setState({
      [type]: true
    });
  }

  handleConfirm(type) {
    Modal[type]({
      title:'Sure?',
      content:'Did you know React?',
      onOk() {

      }
    })
  }
  render() {
    return(
      <div >
        <Card title="Basic Modals" className="card-wrap">
          <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
          <Button type="primary" onClick={()=>this.handleOpen('showModal2')}>Custom Footer</Button>
          <Button type="primary" onClick={()=>this.handleOpen('showModal3')}>top 20px window</Button>
          <Button type="primary" onClick={()=>this.handleOpen('showModal4')}>Horizontally Center</Button>
        </Card>
        <Card title="Information confirmation window" className="card-wrap">
          <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
          <Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
          <Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
          <Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
        </Card>
        <Modal
          title="React"
          visible={this.state.showModal1} 
          onCancel={()=>{
            this.setState({
              showModal1: false
            })
          }}
        >
          <p>Welcome to Bike-Sharing MS</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal2} 
          okText="OK"
          cancelText="forget it"
          onCancel={()=>{
            this.setState({
              showModal2: false
            })
          }}
        >
          <p>Welcome to Bike-Sharing MS</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal3} 
          style={{top: 20}}
          onCancel={()=>{
            this.setState({
              showModal3: false
            })
          }}
        >
          <p>Welcome to Bike-Sharing MS</p>
        </Modal>
        <Modal
          title="React"
          wrapClassName="vertical-center-modal"
          visible={this.state.showModal4} 
          onCancel={()=>{
            this.setState({
              showModal4: false
            })
          }}
        >
          <p>Welcome to Bike-Sharing MS</p>
        </Modal>
      </div>
    );
  }
}
export default Modals;