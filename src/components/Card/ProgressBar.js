

import React from 'react';
import { Card, CardText, CardBody, Col } from 'reactstrap';
import Typography from '../Typography'



const ProgressBar = ({
title,
  subtitle,
  smalltitle,
  val,
  max,
  number,
  color,
  // progress: { value, label },
  ...restProps
}) => {
  return (
    <Card
    body {...restProps}>
      <div className="d-flex justify-content-between">
        <CardText tag="div">
          <Typography className="primary" style = {{'fontSize': '18px', 'color': '#FFFF', 'opacity': '0.9'}}>
          <strong>{title}</strong>  

          </Typography>

          <Typography className="primary" style = {{'fontWeight': 'bold', 'fontSize': '25px', 'color': '#FFFF', 'opacity': '0.9'}}>
                      <progress
                        style={{
                          marginLeft: "0",
                          width: 190,
                        }}
                        value={0}
                        max="100"
                      ></progress>{" "}
                      0%
            <p style={{'fontWeight': 'bold', 'fontSize': '18px', 'color': '#FFFF', 'opacity': '0.7', 'lineHeight': '.7'}}> {val} </p>

            </Typography> 
          <Typography>
          </Typography>
          
          
        <CardText tag="div" className="d-flex justify-content-between" style={{'color': 'white'}}>

        <Typography tag="span"  style={{'transition': 'width 2s','color': 'white', 'opacity': '0.6', 'letter-spacing': '1px'}}>
          {smalltitle}
        </Typography>
      </CardText>
        </CardText>
        
      </div>
      
      </Card>
  )}


  export default ProgressBar;