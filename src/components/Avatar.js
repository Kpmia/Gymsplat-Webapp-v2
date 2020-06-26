import React from 'react';
import PropTypes from 'utils/propTypes';
import logo from '../assets/img/logo/logo_200.png'
import classNames from 'classnames';


const Avatar = ({
  rounded,
  circle,
  src,
  size,
  tag: Tag,
  className,
  style,
  ...restProps
}) => {
  const classes = classNames({ 'rounded-circle': circle, rounded }, className);
  return (
    <div>
    <Tag
      src={src}
      style={{ width: size, height: size, ...style }}
      className={classes}
      {...restProps}
    />
    </div>
  );
};

Avatar.propTypes = {
  tag: PropTypes.component,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  style: PropTypes.object,
};

Avatar.defaultProps = {
  tag: 'img',
  rounded: false,
  circle: false,
  size: 50,
  src: logo,
  style: {},
};

export default Avatar;
