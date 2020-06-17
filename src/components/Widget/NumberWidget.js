import React from 'react';
import PropTypes from 'utils/propTypes';

import { Card, CardText, CardTitle, Progress } from 'reactstrap';
import Typography from '../Typography';

import {
  MdAccountCircle,
  MdDashboard,
  MdViewCarousel,
  MdAccessTime,
  MdPeople,
  MdPages,
  MdFeedback,

} from 'react-icons/md';


const NumberWidget = ({
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
           <img src={MdPeople}></img> <strong>{title}</strong>  

          </Typography>

          <Typography className="primary" style = {{'fontWeight': 'bold', 'fontSize': '25px', 'color': '#FFFF', 'opacity': '0.9'}}>
            {subtitle} 
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


NumberWidget.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  number: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
  ]),
  // progress: PropTypes.shape({
  //   value: PropTypes.number,
  //   label: PropTypes.string,
  // }),
}

// NumberWidget.defaultProps = {
//   title: '',
//   subtitle: '',
//   number: 0,
//   color: 'primary'
//   // progress: {
//   //   value: 0,
//   //   label: '',
//   // },
// };

export default NumberWidget;
