import Modal from 'react-bootstrap/Modal';

export const Popup = ({showPopup, setShowPopup, title, content, footer}) => {

  return (
    <>
      <Modal show={showPopup} onHide={setShowPopup} backdrop="static" keyboard={false} centered>

      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {content}
      </Modal.Body>

      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </Modal>
  </>
  )
}