import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import { Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

import Avatar from '../Avatar';
import { MdAccessTime, MdAccountBalanceWallet } from 'react-icons/md';

const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  text,
  subtext,
  children,
  className,
  thirdtext,
  role,
  ...restProps
}) => {
  const classes = classNames('bg-gradient-theme', className);

  return (
    <Card className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
      <CardText>
          <small>{role}</small>
        </CardText>
      <CardText>
          <strong>{subtext}</strong>
        </CardText>
        <CardText>
          <small>{thirdtext}</small>
        </CardText>
        <CardTitle>{text}</CardTitle>
        {/* <CardSubtitle>{subtext}</CardSubtitle> */}
      </CardBody>
      {children}
    </Card>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

UserCard.defaultProps = {
  avatarSize: 80,
};

export default UserCard;
