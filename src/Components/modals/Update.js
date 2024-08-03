import React from 'react';
import { Modal, Button } from 'flowbite-react';
import UpdateEmployee from '../CRUD/updateEmployee';

const UpdateEmployeeModal = ({ showModal, setShowModal, employee, onUpdate }) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>Update Employee</Modal.Header>
      <Modal.Body>
        <UpdateEmployee employee={employee} onUpdate={() => {
          onUpdate();
          setShowModal(false);
        }} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEmployeeModal;