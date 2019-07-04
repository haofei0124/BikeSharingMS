import React from 'react';
import { Card, Button, notification } from 'antd';
import './ui.less'


class Notice extends React.Component {

  openNotification(type, direction) {
    if(direction) {
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message:'login success',
      description: 'continue login 30 days'
    })
  }

  render() {
    return(
      <div>
        <Card title="Notification" className="card-wrap">
          <Button type="primary" onClick={()=>this.openNotification('success', 'topLeft')}>
            Success
          </Button>
          <Button type="primary" onClick={()=>this.openNotification('info', 'topRight')}>
            Info
          </Button>
          <Button type="primary" onClick={()=>this.openNotification('warning', 'bottomLeft')}>
            Warning
          </Button>
          <Button type="primary" onClick={()=>this.openNotification('error', 'bottomRight')}>
            Error
          </Button>
        </Card>
      </div>
    );
  }
}

export default Notice;