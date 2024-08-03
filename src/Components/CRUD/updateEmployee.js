import React, { useState, useEffect } from 'react';
import {  Button, Label, TextInput, Select } from 'flowbite-react';
import { db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const UpdateEmployee = ({  setShowModal, employee, onUpdate }) => {
  const [name, setName] = useState(employee.name);
  const [surname, setSurname] = useState(employee.surname);
  const [email, setEmail] = useState(employee.email);
  const [salary, setSalary] = useState(employee.salary);
  const [role, setRole] = useState(employee.role);

  useEffect(() => {
    setName(employee.name);
    setSurname(employee.surname);
    setEmail(employee.email);
    setSalary(employee.salary);
    setRole(employee.role);
  }, [employee]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const employeeRef = doc(db, "employees", employee.employeeNumber);
      await updateDoc(employeeRef, {
        name,
        surname,
        email,
        salary,
        role
      });
      onUpdate();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating employee: ", error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name" value="Name" />
        <TextInput
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="surname" value="Surname" />
        <TextInput
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email" value="Email" />
        <TextInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="salary" value="Salary" />
        <TextInput
          id="salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="role" value="Role" />
        <Select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="senior manager">Senior Manager</option>
          <option value="hod">Head of Department</option>
        </Select>
      </div>
      <Button type="submit">Update Employee</Button>
    </form>
  );
};

export default UpdateEmployee;