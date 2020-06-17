import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'utils/propTypes';
import FadeIn from 'react-fade-in'
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";


const ModalExample = ({
    buttonLabel,
    title,
    body,
    className,
    ...restProps
  }) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button style={{'border-radius': '20px', 'background': '#E5E8FD', 'color': '#7888F8', 'border-color': '#FFF', 'fontFamily': '-apple-system, BlinkMacSystemFont'}} onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader style={{'fontFamily': '-apple-system, BlinkMacSystemFont', 'fontWeight': 'bold'}} toggle={toggle}> {title} </ModalHeader>
        <ModalBody body {...restProps}>
        <FadeIn delay="500">
          {body} 
          </FadeIn>
        </ModalBody>
        <ModalFooter>
          <Button style={{'border-color': '#DCDCDC', 'background': '#FFF', 'color': '#DCDCDC' }} onClick={toggle}>Okay!</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

ModalExample.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default ModalExample;