import React from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../axios';
import data from '../../config/menuConfig'

class Header extends React.Component {
  componentWillMount() {
    this.setState({
      userName: 'harry'
    })
    setInterval(()=>{
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime
      })
    },1000)
    // 每隔一秒
    this.getWeatherAPIData();
  }
  

  getWeatherAPIData(){
    axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then((res)=> {
      if(res.status === 'success') {
        let data = res.results[0].weather_data[0];
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    })
  }
  

  render() {
    const menuType = this.props.menuType;
    return(
      <div className="header">
        <Row className="header-top">
        {
          menuType?
          <Col span={6} className="logo">
            <img src="/assets/logo-ant.svg" alt="" />
            <span>bike-sharing MC</span>
          </Col>:''
        }
          <Col span={menuType?18:24}>
            <span>Welcome, {this.state.userName}</span>
            <a href="#">Logout</a>
          </Col>
          
        </Row>
        {
          menuType? '':
          <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            Home
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-img">
              {/* <img src={this.state.dayPictureUrl} /> */}
              <img src='http://api.map.baidu.com/images/weather/day/qing.png' alt="" />
            </span >
            <span className="weather-detail">
            {/* {this.state.weather} */}
            Sunny
            </span>
          </Col>
        </Row>

        }
        
      </div>
    );
  }
}
export default Header;