import React, { useState, useEffect } from 'react';
import EmployeeTable from './tables/employeeTable';
import useEmployees from './CRUD/useEmployees';
import CreateEmployeeModal from './modals/Create';
import { Button, TextInput } from 'flowbite-react';
import Fuse from 'fuse.js';

const EmployeeHierarchy = () => {
  const { employees, loading, error, refreshEmployees } = useEmployees();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
   
    const fuse = new Fuse(employees, {
      keys: ['name', 'surname', 'employeeNumber', 'email'], 
      includeScore: true
    });

    // Perform the search and set filtered employees
    const results = searchTerm ? fuse.search(searchTerm).map(result => result.item) : employees;
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const departments = [...new Set(filteredEmployees.map(emp => emp.department))];

  return (
    <div className="min-h-screen bg-white p-4">
      <h2 className="text-2xl font-bold mb-4">Employee Hierarchy</h2>
      <div className="mb-4">
        <TextInput
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <Button onClick={() => setShowModal(true)} className="mb-4">
        Add New Employee
      </Button>
      <CreateEmployeeModal showModal={showModal} setShowModal={setShowModal} onCreated={refreshEmployees} />
      {departments.map((department) => {
        const departmentEmployees = filteredEmployees.filter(emp => emp.department === department);
        return (
          <div key={department} className="my-8">
            <EmployeeTable
              department={department}
              employees={departmentEmployees}
              onUpdate={refreshEmployees}
              onDelete={refreshEmployees}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeHierarchy;
