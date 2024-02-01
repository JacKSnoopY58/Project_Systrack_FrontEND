import { Modal, Button } from 'react-bootstrap';

export function ConfirmModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.message}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={props.confirm}>Confirm</Button>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

}