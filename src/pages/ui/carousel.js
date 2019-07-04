import React from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';
 
class Carousels extends React.Component {
  render() {
    return(
      <div>
        <Card title="context Carousels" className="card-wrap">
          <Carousel autoplay>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>            
          </Carousel>
        </Card>
        <Card title="pictures Carousels" className="card-wrap"  className="slider-wrap">
          <Carousel autoplay effect="fade">
            <div>
              <img src="/carousel-img/carousel-1.jpg" alt="" />
            </div>
            <div><img src="/carousel-img/carousel-2.jpg" alt="" /></div>
            <div><img src="/carousel-img/carousel-3.jpg" alt="" /></div>            
          </Carousel>
        </Card>
      </div>
    );
  }
}

export default Carousels;