import React from 'react';
import './child.less';
import {Button} from 'antd';
// import 'antd/dist/antd.css';

class Child extends React.Component {
  render() {
    return(
      <div className="child">
        <Button>antD点击一下</Button>
        
      </div>
    );
  }
}

export default Child
