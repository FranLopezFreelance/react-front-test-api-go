import React from 'react'
import { Modal } from 'react-bootstrap';
import LogoWhite from '../../assets/img/logo-white.png';

export default function BasicModal(props) {

  const { show, setShow, children } = props;
  const wrapper = React.createRef();

  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={ () => setShow(false) }
      centered
      size="lg"
      ref={wrapper}
    >
      <Modal.Header>
        <Modal.Title>
          <img src={LogoWhite} alt="Twittor" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { children }
      </Modal.Body>
    </Modal>
  )
}
