import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import CreateEmployee from '../CRUD/createEmployee';

const CreateEmployeeModal = ({ showModal, setShowModal }) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>Create New Employee</Modal.Header>
      <Modal.Body>
        <CreateEmployee />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowModal(false)}>Close</Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default CreateEmployeeModal;
