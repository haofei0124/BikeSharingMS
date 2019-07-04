import React from 'react';
import { Card } from 'antd';
import echartTheme from './../echartTheme';
// import echarts from 'echarts'
// 按需导入
import echarts from 'echarts/lib/echarts';
// 导入饼图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';



class Line extends React.Component {

  // 主题要提前注入 不能写在componentDidMount里
  componentWillMount() {
    echarts.registerTheme('line', echartTheme)
  }

  getOption =()=> {
    let option = {
      title: {
        text: 'User riding order'
      },      
      tooltip: {
        trigger: 'axis',
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
          type: 'line',
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
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data:['OFO','Mobike']
        },
        xAxis: {
          data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'OFO',
            type: 'line',
            data: [
                1200,
                3000,
                4500,
                6000,
                8000,
                12000,
                20000
            ]
        },
        {
            name: 'Mobike',
            type: 'line',
            data: [
                1000,
                2000,
                5500,
                6000,
                8000,
                10000,
                12000
            ]
        },
        ]
    }
    return option
  }

  getOption3 =()=> {
    let option = {
      title: {
        text: 'User riding order'
      },      
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'total order',
          type: 'line',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
          areaStyle: {}
        }
      ]
    }
    return option
  }

  render() {
    return(
      <div>
        <Card title="No.1 line chart">
          <ReactEcharts option={this.getOption()} theme="line" style={{height:500}}/>
        </Card>
        <Card title="No.2 line chart" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} theme="line" style={{height:500}}/>        
        </Card>
        <Card title="No.3 line chart" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption3()} theme="line" style={{height:500}}/>        
        </Card>
      </div>
    );
  }
}
export default Line;