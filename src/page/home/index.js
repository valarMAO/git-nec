import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon } from 'antd';
import { Gutter } from './style';
import Bar from './echarts'

class Home extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
	render() {
		return (
          <Gutter>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box1 box-style">
                  <Icon type="youtube" className='icons'/>
                  <h2 className='title'>999</h2>
                  <h5 className='text'>youtube</h5>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box2 box-style">
                  <Icon type="github" className='icons'/>
                  <h2 className='title'>999</h2>
                  <h5 className='text'>github</h5>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box3 box-style">
                  <Icon type="wechat" className='icons'/>
                  <h2 className='title'>999</h2>
                  <h5 className='text'>wechat</h5>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box4 box-style">
                  <Icon type="skype" className='icons'/>
                  <h2 className='title'>999</h2>
                  <h5 className='text'>skype</h5>
                </div>
              </Col>
            </Row>
            <Bar />
          </Gutter>
    );
	}
}

const mapState = (state) => ({
  
})

const mapDispatch = (dispatch) => ({
  
})

export default connect(mapState,mapDispatch)(Home);