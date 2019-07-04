import React from 'react';
import { Card, Button, Tabs, message, Icon } from 'antd';
import './ui.less';

const TabPane = Tabs.TabPane;
const newTabIndex = 0

class Tab extends React.Component {

  handleCallback=(key)=> {
    message.info("Hi, you choose " + "Tab" + key)
  }

componentWillMount() {
  const panes = [
    {
      title: 'Tab 1',
      content: 'Tab 1',
      key: '1'
    },
    {
      title: 'Tab 2',
      content: 'Tab 2',
      key: '2'
    },
    {
      title: 'Tab 3',
      content: 'Tab 3',
      key: '3'
    }
  ]
  this.setState({
    activeKey: panes[0].key,
    panes
  })
}

onChange=(activeKey)=> {
  this.setState({
    activeKey
  })
}

onEdit = (targetKey, action)=> {
  this[action](targetKey);
}

add = () => {
  const panes = this.state.panes;
  const activeKey = `newTab${this.newTabIndex++}`;
  panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
  this.setState({ panes, activeKey });
}

remove = (targetKey) => {
  let activeKey = this.state.activeKey;
  let lastIndex;
  this.state.panes.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1;
    }
  });
  const panes = this.state.panes.filter(pane => pane.key !== targetKey);
  if (panes.length && activeKey === targetKey) {
    if (lastIndex >= 0) {
      activeKey = panes[lastIndex].key;
    } else {
      activeKey = panes[0].key;
    }
  }
  this.setState({ panes, activeKey });
}


  render() {
    return(
      <div>
        <Card title="Tab" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab="Tab 1" key="1">Bike-Sharing</TabPane>
            <TabPane tab="Tab 2" key="2" disabled>Car-Sharing</TabPane>
            <TabPane tab="Tab 3" key="3">Course-Sharing</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab with pic" className="card-wrap">
          <Tabs 
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            defaultActiveKey="1"
            type="editable-card"
            onEdit={this.onEdit}
          >
            {
              this.state.panes.map((panel)=>{
                return(
                  <TabPane tab={panel.title} 
                  key={panel.key}                  
                  >
                    {panel.content}
                  </TabPane>
                );
              })
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default Tab;
