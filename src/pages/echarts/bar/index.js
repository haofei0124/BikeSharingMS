import React from 'react';
import { Card } from 'antd';
import echartTheme from './../echartTheme';
// import echarts from 'echarts'
// 按需导入
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';



class Bar extends React.Component {

  // 主题要提前注入 不能写在componentDidMount里
  componentWillMount() {
    echarts.registerTheme('charts', echartTheme)
  }

  getOption =()=> {
    let option = {
      title: {
        text: 'User riding order'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'total order',
          type: 'bar',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
        }
      ]
    }
    return option
  }

  getOption2 =()=> {
    let option = {
      title: {
        text: 'User riding order'
      },
      legend: {
        data: ['OFO', 'Mobike','bluegogo']
        // 和后面series里的name必须对应
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
      },
      yAxis: {
        type: 'value'
      },
      // series是整个它的数据源
      // 坐标里中间是数据源
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data:  [2000,3000,5500,7000,8000,12000,20000]
        },
        {
          name: 'Mobike',
          type: 'bar',
          data:  [1500,3000,4500,6000,8000,10000,15000]
        },
        {
          name: 'bluegogo',
          type: 'bar',
          data: [1000,2000,2500,4000,6000,7000,8000]
        },
      ]
    }
    return option
  }

  render() {
    return(
      <div>
        <Card title="No.1 bar charts">
          <ReactEcharts option={this.getOption()} theme="charts" style={{height:500}}/>
        </Card>
        <Card title="No.2 bar charts" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} theme="charts" style={{height:500}}/>        
        </Card>
      </div>
    );
  }
}
export default Bar;