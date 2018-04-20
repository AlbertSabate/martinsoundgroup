import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';

import ATLogo from '../../assets/img/at/AT_square_w.png'
import './albertenez.sass'

class AlberTenez extends Component {
  render() {
    return (
      <Row id="AlberTenez">
        <Col className="text-center">
          <Row>
            <Col>
              <img className="img-fluid" src={ATLogo} alt="Alber Tenez" title="Alber Tenez" />
            </Col>
          </Row>
          <Row id="AlberTenez">
            <Col className="text-center">
              <a href="https://www.facebook.com/alber.tenez">
                <i className="fab fa-facebook-square" /> Facebook
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default AlberTenez
