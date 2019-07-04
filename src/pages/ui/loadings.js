import React from 'react';
import { Card, Button, Spin, Icon, Alert } from 'antd';
import './ui.less'


class Loadings extends React.Component {
  render() {
    const icon = <Icon type="plus" style={{fontSize:24}}/>
    const iconLoading = <Icon type="loading" style={{fontSize:24}}/>
    return(
      <div>
        <Card title="Spin" className="card-wrap">
          <Spin size="small" />
          <Spin style={{margin:'0 10px'}} />
          <Spin size="large" />
          <Spin indicator={icon} style={{marginLeft: 10 }} />
        </Card>
        <Card title="Mask" className="card-wrap">
          <Alert 
            message="React"
            description="welcome to Bike-Sharing MS"
            type="info"
          />
          <Spin tip="Loading...">
            <Alert 
              message="React"
              description="welcome to Bike-Sharing MS"
              type="warning"
            />
          </Spin>
          <Spin indicator={iconLoading}>
            <Alert 
              message="React"
              description="welcome to Bike-Sharing MS"
              type="warning"
            />
          </Spin>
        </Card>
      </div>
    );
  }
}

export default Loadings;