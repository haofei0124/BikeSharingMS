import React from 'react';
import { Card, Button, message } from 'antd';
import './ui.less'


class messages extends React.Component {

  showMessage(type) {
    message[type]("Congratulations on your successful graduation")
  }

  render() {
    return(
      <div>
        <Card title="Global prompt box" className="card-wrap">
          <Button type="primary" onClick={()=>this.showMessage('success')}>Success</Button>
          <Button type="primary" onClick={()=>this.showMessage('info')}>Info</Button>
          <Button type="primary" onClick={()=>this.showMessage('warning')}>Warning</Button>
          <Button type="primary" onClick={()=>this.showMessage('error')}>Error</Button>
          <Button type="primary" onClick={()=>this.showMessage('loading')}>Loading</Button>
        </Card> 
      </div>
    );
  }
}
export default messages;