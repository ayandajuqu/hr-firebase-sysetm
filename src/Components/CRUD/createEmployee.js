

import React, { useState, useEffect } from 'react';
import { db, auth } from '../../config/firebase';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Label, TextInput, Select, Alert } from 'flowbite-react';

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("");
  const [manager, setManager]= useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      const querySnapshot = await getDocs(collection(db, "departments"));
      const departmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDepartments(departmentsData);
    };
    fetchDepartments();
  }, []);
 
    useEffect(() => {
        if (department && role) {
        const selectedDepartment = departments.find(dep => dep.name === department);
        let managerId = "";

        if (selectedDepartment) {
            if (role === 'employee') {
            managerId = selectedDepartment.junior_man || "";
            } else if (role === 'manager') {
            managerId = selectedDepartment.senior_man || "";
            } else if (role === 'senior manager') {
            managerId = selectedDepartment.hod || "";
            }
        }

        setManager(managerId);
        } else {
        setManager("");
        }
    }, [department, role, departments]);

     const generateEmployeeNumber = (role) => {
        let prefix;
      
        switch (role) {
          case 'manager':
            prefix = 'MGR';
            break;
          case 'senior manager':
            prefix = 'SMGR';
            break;
          case 'hod':
            prefix = 'HOD';
            break;
          default:
            prefix = 'EMP';
        }
      
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        return `${prefix}-${randomNum}`;
      };
      
  const addEmployee = async (e) => {
    e.preventDefault();
    if (!name || !surname || !birthDate || !salary || !role || !department ||!email) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const employeeNumber = generateEmployeeNumber(role);
      const defaultPassword = 'ChangeMe123!';

      await createUserWithEmailAndPassword(auth, email, defaultPassword);

      await setDoc(doc(db, "employees", employeeNumber), {
        name,
        surname,
        email,
        employeeNumber,
        birthDate,
        salary,
        role,
        department,
        reportingLineManager: manager || null,
      });

      console.log("Employee added successfully. Employee Number:", employeeNumber);
    } catch (err) {
      console.error('Failed to add employee', err);
      setError(err.message);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={addEmployee}>
      <h2 className="text-2xl font-bold">Create Employee</h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="surname" value="Surname" />
        </div>
        <TextInput
          id="surname"
          type="text"
          required={true}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          type="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="birthDate" value="Birth Date" />
        </div>
        <TextInput
          id="birthDate"
          type="date"
          required={true}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="salary" value="Salary" />
        </div>
        <TextInput
          id="salary"
          type="number"
          required={true}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="role" value="Role" />
        </div>
        <Select id="role" required={true} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="senior manager">Senior Manager</option>
          <option value="hod">Head of Department</option>
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="department" value="Department" />
        </div>
        <Select id="department" required={true} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>{dept.name}</option>
          ))}
        </Select>
      </div>
      <Button type="submit">Add Employee</Button>
      {error && <Alert color="failure">{error}</Alert>}
    </form>
  );
};

export default CreateEmployee;