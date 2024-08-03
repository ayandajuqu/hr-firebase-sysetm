import React, { useState, useEffect } from 'react';
import {  query, where,collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getGravatarUrl, uploadImage } from './utils/utils'; 
import { Card, Button } from 'flowbite-react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase'; 

const ProfilePage = () => {
  const [employee, setEmployee] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employeeNumber = localStorage.getItem('employeeNumber');
      console.log('Employee Number:', employeeNumber); 
      if (!employeeNumber) {
        console.error('No employee number found in local storage');
        return;
      }

      try {
        const q = query(collection(db, 'employees'), where('employeeNumber', '==', employeeNumber));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            setEmployee({ id: docSnap.id, ...data });
            setAvatarUrl(data.avatar || getGravatarUrl(data.email));
          });
        } else {
          console.error('Employee not found');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleFileChange = async (e) => {
    const employeeNumber = localStorage.getItem('employeeNumber');
    if (!employeeNumber) {
      console.error('No employee number found in local storage');
      return;
    }
  
    const file = e.target.files[0];
    if (file) {
      try {
        const downloadURL = await uploadImage(file, employeeNumber);
        setAvatarUrl(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  if (!employee) return <p>Still Loading...</p>;

  return (
    <div className="profile-page">
      <Card className="p-4 max-w-sm mx-auto">
        <h1 className="text-xl font-bold mb-4">{employee.name}</h1>
        <div className="profile-avatar mb-4">
          <img src={avatarUrl} alt="Profile Avatar" className="rounded-full w-32 h-32 object-cover" />
        </div>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Employee Number:</strong> {employee.employeeNumber}</p>
        <div className="upload-avatar mt-4">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
