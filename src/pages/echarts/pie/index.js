import React from 'react';
import { Card } from 'antd';
import echartTheme from './../themeLight';
// import echarts from 'echarts'
// 按需导入
import echarts from 'echarts/lib/echarts';
// 导入饼图
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';



class Pie extends React.Component {

  // 主题要提前注入 不能写在componentDidMount里
  componentWillMount() {
    echarts.registerTheme('pie', echartTheme)
  }

  getOption =()=> {
    let option = {
      title: {
        text: 'User riding order',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: 'total order',
          type: 'pie',
          data: [
            {
                value:1000,
                name:'Mon'
            },
            {
                value: 1000,
                name: 'Tue'
            },
            {
                value: 2000,
                name: 'Wed'
            },
            {
                value: 1500,
                name: 'Thu'
            },
            {
                value: 3000,
                name: 'Fri'
            },
            {
                value: 2000,
                name: 'Sat'
            },
            {
                value: 1200,
                name: 'Sun'
            }
          ]
        }
      ]
    }
    return option
  }

  getOption2 =()=> {
      let option = {
        title: {
          text: 'User riding order',
          x: 'center'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c}({d}%)'
        },
        series: [
          {
            name: 'total order',
            type: 'pie',
            radius: ['50%', '80%'],
            data: [
              {
                  value:1000,
                  name:'Mon'
              },
              {
                  value: 1000,
                  name: 'Tue'
              },
              {
                  value: 2000,
                  name: 'Wed'
              },
              {
                  value: 1500,
                  name: 'Thu'
              },
              {
                  value: 3000,
                  name: 'Fri'
              },
              {
                  value: 2000,
                  name: 'Sat'
              },
              {
                  value: 1200,
                  name: 'Sun'
              }
            ]
          }
        ]
    }
    return option
  }

  getOption3 =()=> {
      let option = {
        title: {
          text: 'User riding order',
          x: 'center'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c}({d}%)'
        },
        series: [
          {
            name: 'total order',
            type: 'pie',
            data: [
              {
                  value:1000,
                  name:'Mon'
              },
              {
                  value: 1000,
                  name: 'Tue'
              },
              {
                  value: 2000,
                  name: 'Wed'
              },
              {
                  value: 1500,
                  name: 'Thu'
              },
              {
                  value: 3000,
                  name: 'Fri'
              },
              {
                  value: 2000,
                  name: 'Sat'
              },
              {
                  value: 1200,
                  name: 'Sun'
              }
            ].sort((a, b)=>{
              return a.value - b.value
            }),
            roseType: 'radius'
          }
        ]
    }
    return option
  }

  render() {
    return(
      <div>
        <Card title="No.1 Pie chart">
          <ReactEcharts option={this.getOption()} theme="pie" style={{height:500}}/>
        </Card>
        <Card title="No.2 Pie chart" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} theme="pie" style={{height:500}}/>        
        </Card>
        <Card title="No.3 Pie chart" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption3()} theme="pie" style={{height:500}}/>        
        </Card>
      </div>
    );
  }
}
export default Pie;