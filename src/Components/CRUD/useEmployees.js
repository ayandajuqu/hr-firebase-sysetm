import { useEffect, useState, useCallback } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs,  getDoc } from 'firebase/firestore';

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employeeData = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const employeeData = { id: docSnapshot.id, ...data };

        if (employeeData.reportingLineManager && typeof employeeData.reportingLineManager === 'object') {
          const managerDoc = await getDoc(employeeData.reportingLineManager);

          if (managerDoc.exists()) {
            employeeData.managerNumber = managerDoc.data().employeeNumber || 'N/A';
          } else {
            employeeData.managerNumber = 'N/A';
          }
        } else {
          employeeData.managerNumber = 'N/A';
        }

        return employeeData;
      }));

      const rolePriority = {
        'employee': 1,
        'manager': 2,
        'senior manager': 3,
        'hod': 4
      };
      
      employeeData.sort((a, b) => (rolePriority[a.role] || 0) - (rolePriority[b.role] || 0));
      setEmployees(employeeData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const refreshEmployees = useCallback(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { employees, loading, error, refreshEmployees };
};

export default useEmployees;