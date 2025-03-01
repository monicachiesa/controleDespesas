import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ConfirmationModal({ toggle, modal, functionYes }) {
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirmação</ModalHeader>
                <ModalBody>
                    Deseja realmente excluir este item?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={functionYes}>
                        Sim
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ConfirmationModal;