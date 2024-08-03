// src/components/EmployeeTable.js
import React,{useState} from 'react';
import { Table, Button } from 'flowbite-react';
import DeleteEmployeeModal from '../modals/Delete';
import UpdateEmployeeModal from '../modals/Update';


const EmployeeTable = ({ department, employees, onUpdate, onDelete }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };
    

  return (
    
    <div className="my-8">
      

      <h2 className="text-2xl font-bold mb-4">{department} Department</h2>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Employee Number</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Surname</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Salary</Table.HeadCell>
          <Table.HeadCell>Line Manager</Table.HeadCell>
          <Table.HeadCell>Upate</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {employees.map((employee) => (
            <Table.Row key={employee.employeeNumber}>
              <Table.Cell>{employee.employeeNumber}</Table.Cell>
              <Table.Cell>{employee.name}</Table.Cell>
              <Table.Cell>{employee.surname}</Table.Cell>
              <Table.Cell>{employee.email}</Table.Cell>
              <Table.Cell>{employee.role}</Table.Cell>
              <Table.Cell>{employee.salary}</Table.Cell>
              <Table.Cell>{employee.managerNumber || 'N/A'}</Table.Cell>
              <Table.Cell>
                <Button size="sm" onClick={() => handleUpdateClick(employee)}>Update</Button>
                </Table.Cell>
                <Table.Cell>
                <Button size="sm" color="failure" onClick={() => handleDeleteClick(employee)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {selectedEmployee && (
        <>
          <UpdateEmployeeModal
            showModal={showUpdateModal}
            setShowModal={setShowUpdateModal}
            employee={selectedEmployee}
            onUpdate={() => {
              onUpdate();
              setShowUpdateModal(false);
            }}
          />
          <DeleteEmployeeModal
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            employee={selectedEmployee}
            onDelete={() => {
              onDelete();
              setShowDeleteModal(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default EmployeeTable;
