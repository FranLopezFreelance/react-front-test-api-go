import React from 'react';
import { Modal } from 'react-bootstrap';
import { Close } from '../../../utils/icons';

export default function InfoModal(props) {
  const { show, setShow, title, children } = props;

  return (
    <Modal
      className="info-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <h2>{title}</h2>
          <Close
            onClick={() => {
              setShow(false);
            }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
