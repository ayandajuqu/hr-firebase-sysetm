import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { db } from '../../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const DeleteEmployeeModal = ({ showModal, setShowModal, employee, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "employees", employee.employeeNumber));
      onDelete();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting employee: ", error);
    }
  };

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>Delete Employee</Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {employee.name} {employee.surname}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button color="failure" onClick={handleDelete}>Delete</Button>
        <Button color="gray" onClick={() => setShowModal(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEmployeeModal;